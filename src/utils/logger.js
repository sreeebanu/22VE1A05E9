export function logAction(action, data) {
  const entry = { action, data, timestamp: new Date().toISOString() };
  console.info("LOG:", JSON.stringify(entry));
  
}
