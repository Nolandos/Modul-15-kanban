/*
                let id = e.target.id;
                let column_id = e.target.parentElement.id;
                let name = e.target.parentElement.querySelector('.description').innerHTML;

                var data = {
                    'name': name,
                    'bootcamp_kanban_column_id': column_id,
                }

                fetch(prefix + baseUrl + '/card/' + id, {
                    method: 'PUT',
                    headers: {
                        'X-Client-Id': '4018',
                        'X-Auth-Token': '44ff47e0eb798038805be6d0ef8ad1f1',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                .then(function(res) {
                    return res.json();
                })
                .then(function(resp) {
                   console.log(data);
                }); 
                */


               if(e.target.classList.contains('card')) {
                let id = e.target.id;
                let column_id = e.target.parentElement.id;
                let name = e.target.parentElement.querySelector('.description').innerHTML;
                console.log(id);
                console.log(column_id);
                console.log(name);
                console.log(e.target);
            }