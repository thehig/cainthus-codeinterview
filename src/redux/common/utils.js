export function getError(action) {
  // No payload: Network error
  if (!action.payload) return { error: 'Network request failed' };
  // Default payload: Assume no response object
  const defaultError = { error: `${action.payload.status} - ${action.payload.statusText}` };
  // No response object: Default error
  if (!action.payload.response) return defaultError;

  // No response message error: Default error
  const response = action.payload.response;
  if (typeof response === 'undefined' || typeof response.messages === 'undefined' || typeof response.messages.error === 'undefined') {
    return defaultError;
  }

  return { error: response.messages.error.reduce((prev, err) => `${prev} ${err.code}:${err.message}`, '') };
}