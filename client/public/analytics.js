(function() {
    // === Analytics setup ===
    let token = null;
    const version = "0.0.1";
    const environment = (() => {
        const host = window.location.hostname;
        return host === 'localhost' || host.startsWith('127.') || host.startsWith('192.168.') || host.startsWith('10.') ? 'development' : 'production';
    })();

    const config = {
        token,
        version,
        environment
    };

    // === Global object ===
    const Visor = {
        init: function(userToken) {
            token = userToken;
        },
        get config() {
            return { ...config };
        },
        track: function(event, data) {
            if (config.environment === 'development') {
                console.debug('Track (dev mode, not sending):', event, data);
                return;
            }

            if (!token) {
                console.error('Visor not initialized. Call Visor.init("your_token") first.');
                return;
            }

            // TODO: send data
        }
    };

    Object.defineProperty(window, 'Visor', {
        value: Visor,
        writable: false,
        enumerable: true,
        configurable: false
    });
})();