const ctx = document.querySelector('.activity-chart');
const ctx2 = document.querySelector('.prog-chart-3');
// const ctx3 = document.querySelector('.prog-chart-6');
// const ctx4 = document.querySelector('.prog-chart-12');


new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
            label: 'Time',
            data: [8, 6, 7, 6, 10, 8, 4],
            backgroundColor: '#1e293b',
            borderWidth: 3,
            borderRadius: 6,
            hoverBackgroundColor: '#60a5fa'
        }]  
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                border: {
                    display: true
                },
                grid: {
                    display: true,
                    color: '#1e293b'
                }
            },
            y: {
                ticks: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuad',
        }
    }
});

new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dec' ],
        datasets: [{
            label: 'Venom',
            data: [6, 10, 8, 14, 6, 7, 4 , 5, 6, 3, 5, 3],
            borderColor: '#1e293b',
            tension: 0.4
        },
        {
            label: 'Home Alone',
            data: [8, 6, 7, 6, 11, 8, 10,8, 6, 7, 6, 11],
            borderColor: '#1f76b1',
            tension: 0.4
        }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                grid: {
                    display: false,
                }
            },
            y: {
                ticks: {
                    display: false
                },
                border: {
                    display: false,
                    dash: [5, 5]
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuad',
        }
    }
});


// new Chart(ctx3, {
//     type: 'line',
//     data: {
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dec' ],
//         datasets: [{
//             label: 'Class GPA',
//             data: [6, 10, 8, 14, 6, 7, 4 , 5, 6, 3, 5, 3],
//             borderColor: '#0891b2',
//             tension: 0.4
//         },
//         {
//             label: 'Aver GPA',
//             data: [8, 6, 7, 6, 11, 8, 10,8, 6, 7, 6, 11],
//             borderColor: '#ca8a04',
//             tension: 0.4
//         }
//         ]
//     },
//     options: {
//         responsive: true,
//         maintainAspectRatio: true,
//         scales: {
//             x: {
//                 grid: {
//                     display: false,
//                 }
//             },
//             y: {
//                 ticks: {
//                     display: false
//                 },
//                 border: {
//                     display: false,
//                     dash: [5, 5]
//                 }
//             }
//         },
//         plugins: {
//             legend: {
//                 display: false
//             }
//         },
//         animation: {
//             duration: 1000,
//             easing: 'easeInOutQuad',
//         }
//     }
// });



// new Chart(ctx4, {
//     type: 'line',
//     data: {
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dec' ],
//         datasets: [{
//             label: 'Class GPA',
//             data: [6, 10, 8, 14, 6, 7, 4 , 5, 6, 3, 5, 3],
//             borderColor: '#0891b2',
//             tension: 0.4
//         },
//         {
//             label: 'Aver GPA',
//             data: [8, 6, 7, 6, 11, 8, 10,8, 6, 7, 6, 11],
//             borderColor: '#ca8a04',
//             tension: 0.4
//         }
//         ]
//     },
//     options: {
//         responsive: true,
//         maintainAspectRatio: true,
//         scales: {
//             x: {
//                 grid: {
//                     display: false,
//                 }
//             },
//             y: {
//                 ticks: {
//                     display: false
//                 },
//                 border: {
//                     display: false,
//                     dash: [5, 5]
//                 }
//             }
//         },
//         plugins: {
//             legend: {
//                 display: false
//             }
//         },
//         animation: {
//             duration: 1000,
//             easing: 'easeInOutQuad',
//         }
//     }
// });