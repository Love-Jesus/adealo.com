/**
 * Main Firebase Functions entry point
 */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Cloud Function to get import status
export const getImportStatus = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'The function must be called while authenticated.'
    );
  }
  
  const importId = data.importId;
  if (!importId) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with an importId.'
    );
  }
  
  try {
    const importDoc = await db.collection('imports').doc(importId).get();
    
    if (!importDoc.exists) {
      throw new functions.https.HttpsError(
        'not-found',
        'Import job not found.'
      );
    }
    
    return importDoc.data();
  } catch (error: any) {
    console.error('Error getting import status:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Error retrieving import status.'
    );
  }
});

// Export functions from exports.ts
export { initiateExport, getExportStatus, getExportPreview } from './exports';

// Export widget functions
export { getWidgetScript, getWidgetScriptHttp, trackWidgetInteraction, trackWidgetInteractionHttp } from './widget-embed';
export { 
  getWidgetConfig,
  getWidgetConfigHttp,
  trackWidgetInteractionHttp as trackWidgetConfigInteractionHttp,
  widget
} from './widget-config';

// Export tracking functions
export { trackVisit, getTrackingScript } from './tracking';

// Export enrichment functions
export { processEnrichmentTasks, processUnresolvedIPs } from './enrichment';

// Stripe webhook handler temporarily removed to fix deployment issues
// export { stripeWebhook } from './services/stripe/webhooks';

// Export Stripe functions
export {
  createSubscription,
  createPaymentIntent,
  cancelSubscription,
  updateSubscription,
  getPaymentMethods
} from './services/stripe/functions';

// Claude AI functions temporarily removed to fix deployment issues
// export {
//   processClaudeMessage,
//   updateClaudeApiKey
// } from './claude';

// Export invitation functions
export {
  sendInvitationEmail,
  checkExpiredInvitations
} from './invitations';

// Widget adapter redirect functions removed - direct URLs now used instead
