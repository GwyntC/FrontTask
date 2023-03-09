import {Button, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import useAccessValidate from "../../../hooks/useAccessValidate";
import Typography from 'components/Typography';
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import useChangePage from "../../../hooks/useChangePage";
import * as PAGES from "../../../constants/pages";
import useLocationSearch from 'hooks/useLocationSearch';
import {useDispatch} from "react-redux";
import {fetchCreateProduct} from "../../../app/actions/products";
import {useState} from "react";

const getClasses = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
}));
const CreateEdit = ({
                        authorities,
                    }) => {
    const classes = getClasses();
    const canSeeList = useAccessValidate({
        ownedAuthorities: authorities,
        neededAuthorities: ['МОЖНО_ВОТ_ЭТУ_ШТУКУ'],
    });
    const changePage = useChangePage();
    const locationSearch = useLocationSearch();
    const routeChange = () => {
        changePage({
            locationSearch: locationSearch.redirectLocationSearch
                ? JSON.parse(locationSearch.redirectLocationSearch)
                : locationSearch,
            path: locationSearch.redirectPathname || `/${PAGES.INITIAL}`,
        });
    }
    const {id} = useParams();
    const dispatch = useDispatch();
    const valuesInit = {
        modelName: "",
        brandName: "",
        country: "",
        price: "",
        categoryId: ""
    };
    const [data, setData] = useState(valuesInit);
    const handleChange=(e)=>{
        setData({ ...data, [e.target.name]: e.target.value });
    }
    return (
        <div className={classes.container}>
            {canSeeList && (
                <Typography>
                    <div>
                        <TextField name="modelName" label="Model" value={data.model} onChange={handleChange}/>
                        <TextField name="brandName" label="Brand" value={data.brand} onChange={handleChange}/>
                    </div>
                    <div>
                        <TextField name="country" onChange={handleChange} label="Country" value={data.country}/>
                        <TextField name="price" onChange={handleChange} label="Price" value={data.price}/>
                        <TextField name="categoryId" onChange={handleChange} label="CategoryId" value={data.category}/>
                    </div>
                    <Button onClick={() =>
                         dispatch(fetchCreateProduct(data,
                         ))
                         //routeChange();
                       // console.log(JSON.stringify(data));
                    }>SAVE</Button>
                    <Button onClick={routeChange}>CANCEL</Button>
                </Typography>
            )}
        </div>
    )
};
export default CreateEdit;