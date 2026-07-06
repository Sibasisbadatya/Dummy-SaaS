const approuter = require('@sap/approuter');
const ar = approuter();

// Subscription callback - called when tenant subscribes/unsubscribes
ar.beforeRequestHandler.use('/callback/v1.0/tenants/*', (req, res) => {
  const tenantId = req.params[0];
  
  // Security: Validate authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('Missing or invalid authorization header');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Additional security: Check tenant ID format
  if (!tenantId || tenantId.length < 5) {
    console.error('Invalid tenant ID format');
    return res.status(400).json({ error: 'Invalid tenant ID' });
  }
  
  if (req.method === 'PUT') {
    console.log(`Tenant subscribed: ${tenantId}`);
    // TODO: Add provisioning logic here (create DB schema, bind services, etc.)
    res.status(200).send(tenantId);
  } else if (req.method === 'DELETE') {
    console.log(`Tenant unsubscribed: ${tenantId}`);
    // TODO: Add deprovisioning logic here (cleanup resources, etc.)
    res.status(200).send(tenantId);
  } else {
    res.status(405).send('Method not allowed');
  }
});

// Dependencies callback - returns required service dependencies
ar.beforeRequestHandler.use('/callback/v1.0/dependencies', (req, res) => {
  // Security: Validate authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('Missing or invalid authorization header');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  res.status(200).json([]);
});

ar.start();
