import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import Link from 'components/Link';
import Typography from 'components/Typography';
import useAccessValidate from 'hooks/useAccessValidate';
import {List} from "@material-ui/core";
import {fetchProducts} from "../../../app/actions/products";
import {fetchSignIn} from "../../../app/actions/user";

const getClasses = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
const Initial = ({
  authorities,
}) => {
  const dispatch=useDispatch();
  useEffect(() => {
        console.log("HI");
     dispatch(fetchProducts());
      }
  );
  const classes = getClasses();
  const {
    availableItems,
  } = useSelector(({ reducer })=> reducer);
  console.log(availableItems)
  const canSeeList = useAccessValidate({
    ownedAuthorities: authorities,
    neededAuthorities: ['МОЖНО_ВОТ_ЭТУ_ШТУКУ'],
  });

  return (
    <List className={classes.container} >
      {canSeeList && availableItems.map((item, index) => (
        <Link
          href={index % 2 === 0
            ? `https://www.google.com.ua/search?q=${item}&hl=ru`
            : undefined}
          to={index % 2 !== 0
            ? (location => ({
              ...location,
              pathname: `/${item}`,
              search: `${location.search}&newProp=42`,
            }))
            : undefined}
        >
          <Typography>
            {item}
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
