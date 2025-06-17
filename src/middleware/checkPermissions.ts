import type { MiddlewareHandler } from 'hono';
import { ac } from '../services/accessControl.js';

const actions = {
    create: {
        own: (role: string, resource: string) => ac.can(role).createOwn(resource),
        any: (role: string, resource: string) => ac.can(role).createAny(resource),
    },
    read: {
        own: (role: string, resource: string) => ac.can(role).readOwn(resource),
        any: (role: string, resource: string) => ac.can(role).readAny(resource),
    },
    update: {
        own: (role: string, resource: string) => ac.can(role).updateOwn(resource),
        any: (role: string, resource: string) => ac.can(role).updateAny(resource),
    },
    delete: {
        own: (role: string, resource: string) => ac.can(role).deleteOwn(resource),
        any: (role: string, resource: string) => ac.can(role).deleteAny(resource),
    },
} as const;

export const checkPermissions = (
    action: keyof typeof actions,
    resource: string,
    ownership: keyof typeof actions['create'] = 'any'
): MiddlewareHandler => {
    return async (c, next) => {
        const user = c.get('user');

        if (!user) {
            return c.json({ error: 'Utilisateur non authentifié' }, 401);
        }

        const permission = actions[action][ownership](user.role, resource);

        if (!permission.granted) {
            return c.json({ error: 'Accès refusé' }, 403);
        }

        await next();
    };
};
