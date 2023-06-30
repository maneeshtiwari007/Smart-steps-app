import analytics from '@react-native-firebase/analytics';
export const GTM = {
    logGTM: async function(params){
        const logRequest = await analytics().logEvent('basket', {
            id: 3745092,
            item: 'mens grey t-shirt',
            description: ['round neck', 'long sleeved'],
            size: 'L',
          });
        return logRequest;
    }
}