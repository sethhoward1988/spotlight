data = {
    commands: [
        {
            title: 'Make Transaction',
            fn: function () {
                console.log('Making some sort of transaction')
            }
        },
        {
            title: 'Call',
            fn: function () {
                console.log('Making a call of some sort');
            }
        },
        {
            title: 'Shutdown',
            fn: function () {
                console.log('Shutting down');
            }
        }

    ],

    GoTo: [
        {
            title: 'Home',
            fn: function () {
                window.location.pathname = "/home"
            }
        },
        {
            title: 'Settings',
            fn: function () {
                window.location.pathname = "/settings"
            },
        },
        {
            title: 'Profile',
            fn: function () {
                window.location.pathname = "/profile"
            }
        },


    ]
}