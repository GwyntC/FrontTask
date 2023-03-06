import {
  getToken,
} from 'token';

const getHeaders = () => ({
  Accept: 'application/json',
  Authorization: `Bearer ${getToken()}`,
  'Content-Type': 'application/json',
});

const fetchGet = ({ params = {}, url }) => {
  url = new URL(url);
  url.search = new URLSearchParams(params).toString();
 // console.log(params);
  return fetch(
    url,
    {
      headers: getHeaders(),
      method: 'GET',
    }
  );
};
const fetchDelete=({params={},url})=>{
  let id =params.id.id;
  url=new URL(url+"/"+id.toString());
 // url.search = new URLSearchParams(params).toString();
  return fetch(
      url,
      {
        headers: getHeaders(),
        method: 'DELETE',
      }
  );
};
const fetchPost = ({ body, params = {}, url }) => {
  url = new URL(url);
  url.search = new URLSearchParams(params).toString();

  return fetch(
    url,
    {
      body: JSON.stringify(body),
      headers: getHeaders(),
      method: 'POST',
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
export const deleteJson=({
  params,
  url,
})=>{
  return fetchDelete({
    params,
    url,
  }).then((response)=>{
    if(response.ok){
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
};

