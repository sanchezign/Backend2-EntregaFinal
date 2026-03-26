export const authorization = (role) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ status: 'error', message: 'No autenticado' });

    if (role === 'admin' && req.user.role !== 'admin') {
      return res.status(403).json({ status: 'error', message: 'Solo administrador puede realizar esta acción' });
    }

    next();
  };
};