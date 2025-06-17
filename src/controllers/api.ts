import { Hono } from "hono";
import { checkPermissions } from "../middleware/checkPermissions.js";

const route = new Hono();

// Ajoutez vous routes d'api ici
route.get('/profile/:id', checkPermissions('read', 'profile', 'any'), (c) => {
  return c.text('Profil accédé');
});

route.post('/data', checkPermissions('create', 'data', 'own'), (c) => {
  return c.text('Donnée créée');
});

route.put('/data/:id', checkPermissions('update', 'data', 'own'), (c) => {
  return c.text('Donnée modifiée');
});

route.delete('/data/:id', checkPermissions('delete', 'data', 'own'), (c) => {
  return c.text('Donnée supprimée');
});

export default route;
