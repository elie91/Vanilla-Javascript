export const fakeLayoutResponse = {
    applicationName: 'APP',
    logo: 'home',
    items: [
        {
            Icon: "settings_brightness",
            Path: "",
            Label: "Toggle Theme",
            Position: "Top",
            Action: "toggleTheme"
        },
        {
            Icon: "Settings",
            Path: "/settings",
            Label: "Settings",
            Position: "Lateral"
        },
        {
            Icon: "grid_on",
            Path: "/datagrid-test",
            Label: "Datagrid",
            Position: "Lateral"
        },
        {
            Icon: "Settings",
            Path: "/report",
            Label: "Reports",
            Position: "Top",
            MenuSubItems: [
                {
                    Icon: "Settings",
                    Path: "/report/synthesis",
                    Label: "Synthesis",
                    Position: "Top"
                },
                {
                    Icon: "Settings",
                    Path: "/report/details",
                    Label: "Details",
                    Position: "Top"
                }
            ]

        },
        {
            Icon: "Flag",
            Path: "/user",
            Label: "Analyse",
            Position: "Lateral",
            MenuSubItems: [
                {
                    Icon: "Flag",
                    Path: "/user/profil",
                    Label: "Tomate",
                    Position: "Lateral"
                },
                {
                    Icon: "Flag",
                    Path: "/user/commands",
                    Label: "Pomme",
                    Position: "Lateral"
                }
            ]
        }
    ]
}

export const fakeDatagridData = {
    title: 'Titre Elie',
    columns: [
        {title: "Nom", name: "lastname"},
        {title: "Prenom", name: "firstname"},
        {title: "Date", name: "date"},
        {title: "Ville", name: "city"},
        {title: "Age", name: "age"},
        {title: "Argent", name: "amount"},
    ],
    rows: [
        {id: 1, lastname: "Bismuth", firstname: "Elie", city: 'Paris', date: '2020-07-21', age: 24, amount: 200},
        {id: 2, lastname: "Dupond", firstname: "Test", city: 'Marseille', date: '2020-07-10', age: 70, amount: 400},
        {id: 3, lastname: "Dupuis", firstname: "Jean", city: 'Toulouse', date: '2020-07-01', age: 60, amount: 800},
        {id: 4, lastname: "Pomme", firstname: "Eric", city: 'Dijon', date: '2020-06-21', age: 50, amount: 800},
        {id: 5, lastname: "Poire", firstname: "Philippe", city: 'New-York', date: '2020-05-21', age: 40, amount: 800},
        {id: 6, lastname: "Tomate", firstname: "Sarah", city: 'Barcelone', date: '2020-02-21', age: 20, amount: 800},
        {id: 7, lastname: "Carotte", firstname: "Elena", city: 'Milan', date: '2019-07-21', age: 30, amount: 800},
        {id: 8, lastname: "Test", firstname: "Elena", city: 'Paris', date: '2015-02-19', age: 30, amount: 800},
        {id: 9, lastname: "Toto", firstname: "Elie", city: 'Barcelone', date: '2014-07-21', age: 30, amount: 800},
        {id: 10, lastname: "Titi", firstname: "Philippe", city: 'Milan', date: '2010-07-21', age: 30, amount: 800},
        {id: 11, lastname: "Eude", firstname: "Elena", city: 'Barcelone', date: '2020-06-28', age: 30, amount: 800},
        {id: 12, lastname: "Keren", firstname: "Eric", city: 'Milan', date: '2020-07-18', age: 30, amount: 800},
        {id: 13, lastname: "David", firstname: "Jacques", city: 'Milan', date: '2020-07-17', age: 30, amount: 800},
        {id: 14, lastname: "Jean", firstname: "Philippe", city: 'Barcelone', date: '2020-07-19', age: 30, amount: 800},
        {id: 15, lastname: "Bismuth", firstname: "Yves", city: 'Paris', date: '2020-07-12', age: 30, amount: 350},
        {id: 16, lastname: "Tomate", firstname: "Adrien", city: 'Milan', date: '2020-06-10', age: 30, amount: 400},
        {id: 17, lastname: "Dupuis", firstname: "Elena", city: 'Paris', date: '2020-06-12', age: 30, amount: 800},
        {id: 18, lastname: "Dupuis", firstname: "Pierre", city: 'Milan', date: '2020-06-19', age: 30, amount: 198},
        {id: 19, lastname: "Carotte", firstname: "Jacques", city: 'Paris', date: '2020-06-01', age: 30, amount: 800},
        {id: 20, lastname: "Carotte", firstname: "Philippe", city: 'Milan', date: '2020-06-02', age: 30, amount: 800},
    ]
}