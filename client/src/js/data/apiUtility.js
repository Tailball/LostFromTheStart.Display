import Axios from 'axios';

const url = '';
//const url = 'http://localhost:3000';

export const getLikes = () => {
    const route = 'api/socialmedia';

    return new Promise((res, rej) => {

        Axios.get(`${url}/${route}`)
        
        .then(result => {
            if(result && result.data) {
                res(result.data);
            }
            else {
                rej({ message: 'unknown error' });
            }
        })

        .catch(err => {
            rej(err);
        });

    });
};