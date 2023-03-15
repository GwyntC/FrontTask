import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import Typography from 'components/Typography';
import useAccessValidate from 'hooks/useAccessValidate';
import {Button, List} from "@material-ui/core";
import {deleteProduct, fetchProducts} from "../../../app/actions/products";
import {useHistory} from "react-router-dom";

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
  const [showResults, setShowResults] = React.useState(false)
  const buttonsShow=()=>{
    setShowResults(true);
  }
  const buttonsHide=()=>{
    setShowResults(false);
  }
  const dispatch=useDispatch();
 // const dataFetchedRef = useRef(false);
  const classes = getClasses();
  const {
    availableItems,
  } = useSelector(({ reducer })=> reducer);
  useEffect(() => {
        dispatch(fetchProducts());
      },[]
  );
  const canSeeList = useAccessValidate({
    ownedAuthorities: authorities,
    neededAuthorities: ['МОЖНО_ВОТ_ЭТУ_ШТУКУ'],
  });
  const history=useHistory();
  const routeChange = (id) =>{
    let path = `createedit/`+id.id;
    history.push({
      pathname:path,
    });
  }
  return (
    <List className={classes.container} >
      <Button style={{
        backgroundColor:"#00a300"
      }} variant="contained" onClick={routeChange}>CREATE</Button>
      {canSeeList && availableItems.map(({id,modelName,country,price}) => (
          <Typography
           onMouseEnter={buttonsShow} onMouseLeave={buttonsHide}>  {modelName} {country} {price}
            {showResults?<Button style={{
              backgroundColor: "#21b6ae",
            }} variant="contained" onClick={() => routeChange({id})}>UPDATE</Button>:null }
            {showResults?<Button style={{
              backgroundColor:"#ff0000"
            }} variant="contained" id={id} onClick={()=> {
              dispatch(deleteProduct({id}))
            }
            }>DELETE</Button>:null}
          </Typography>
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
