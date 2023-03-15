import {
    getToken,
} from 'token';

const getHeaders = () => ({
    Accept: 'application/json',
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
});

const fetchGet = ({params = {}, url}) => {
  //  url = new URL(url);
    //url.search = new URLSearchParams(params).toString();
    let id=params.id;
    if(id===undefined){
        url = new URL(url);
    }
    else{
        url = new URL(url+id.toString());
    }
    // console.log(params);
    return fetch(
        url,
        {
            headers: getHeaders(),
            method: 'GET',
        }
    );
};
const fetchDelete = ({params = {}, url}) => {
    let id = params.id.id;
    url = new URL(url + "/" + id.toString());
    // url.search = new URLSearchParams(params).toString();
    return fetch(
        url,
        {
            headers: getHeaders(),
            method: 'DELETE',
        }
    );
};
const fetchPost = ({body, params = {}, url}) => {
    url = new URL(url);
    url.search = new URLSearchParams(params).toString();
    let look;
    if(body==undefined) {
       // const look = JSON.stringify(body.body);
        look="";
    }
    else {
        look= JSON.stringify(body.body);
    }
    return fetch(
        url,
        {
            body: look,
            headers: getHeaders(),
            method: 'POST',
        }
    );
};

const fetchPut = ({body, params = {}, url}) => {
    let id = params;
    url = new URL(url + "/" + id.toString());
    const look = JSON.stringify(body);
    return fetch(
        url,
        {
            body: look,
            headers: getHeaders(),
            method: 'PUT',
        }
    );
};

export const getJson = ({
                            params,
                            url,
                        }) => {
    return fetchGet({
        params,
        url,
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw response;
    });
};
export const deleteJson = ({
                               params,
                               url,
                           }) => {
    return fetchDelete({
        params,
        url,
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw response;
    });
}
export const postJson = ({
                             body,
                             params,
                             url,
                         }) => {
    return fetchPost({
        body,
        params,
        url,
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw response;
    });
}
export const putJson = ({
                            body,
                            params,
                            url
                        }) => {
    return fetchPut({
        body,
        params,
        url,
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw response;
    });
}

