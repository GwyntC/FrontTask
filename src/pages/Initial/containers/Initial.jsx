import React, {useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import Link from 'components/Link';
import Typography from 'components/Typography';
import useAccessValidate from 'hooks/useAccessValidate';
import {Button, List} from "@material-ui/core";
import {deleteProduct, fetchDeleteProduct, fetchProducts} from "../../../app/actions/products";
import {fetchSignIn} from "../../../app/actions/user";
import useLocationSearch from "../../../hooks/useLocationSearch";

const getClasses = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
const Initial = ({
  authorities,
}
) => {
  const buttonsShow=()=>{
  }
  const dispatch=useDispatch();
  const dataFetchedRef = useRef(false);
  const classes = getClasses();
  const {
    availableItems,
  } = useSelector(({ reducer })=> reducer);
  useEffect(() => {
        // console.log("HI");
    console.log( dataFetchedRef.current)
        dispatch(fetchProducts());
      },[]
  );
  const canSeeList = useAccessValidate({
    ownedAuthorities: authorities,
    neededAuthorities: ['МОЖНО_ВОТ_ЭТУ_ШТУКУ'],
  });
  return (
    <List className={classes.container} >
      <Button style={{
        backgroundColor:"#00a300"
      }} variant="contained">CREATE</Button>
      {canSeeList && availableItems.map(({id,modelName,country,price}) => (
        <Link
         // href={index % 2 === 0
         //   ? `https://www.google.com.ua/search?q=${coffee}&hl=ru`
         //   : undefined}
        //  to={index % 2 !== 0
         //>  ? (location => ({
          //    ...location,
          //    pathname: `/${item}`,
          //    search: `${location.search}&newProp=42`,
          //  }))
          //  : undefined}
        >
          <Typography
           onMouseOver={buttonsShow}>  {modelName} {country} {price}
            <Button style={{
            backgroundColor: "#21b6ae",
          }} variant="contained">UPDATE</Button>
            <Button style={{
              backgroundColor:"#ff0000"
            }} variant="contained" id={id} onClick={(e)=> {
              dispatch(deleteProduct({id}))
            }
            }>DELETE</Button>
          </Typography>
        </Link>
      ))}
      {!canSeeList && (
        <Typography>
          Не могу ничего показать :(
        </Typography>
      )}
    </List>
  )
};

export default Initial;
