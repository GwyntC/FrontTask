import {Button, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import useAccessValidate from "../../../hooks/useAccessValidate";
import Typography from 'components/Typography';
import {useParams} from "react-router-dom";
import useChangePage from "../../../hooks/useChangePage";
import * as PAGES from "../../../constants/pages";
import useLocationSearch from 'hooks/useLocationSearch';
import {useDispatch, useSelector} from "react-redux";
import {fetchProduct, fetchUpdateProduct} from "../../../app/actions/products";
import {useState} from "react";
import {useEffect} from "react";

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
    let check=false;
    const {id} = useParams();
    const dispatch = useDispatch();
    const availableItems= useSelector(({ changeReducer })=> changeReducer);
    useEffect(() => {//use state after useSelect;check if available change then change:
            dispatch(fetchProduct(id));
        },[]
    );
    //console.log(availableItems.contains);
    let valuesInit;
    valuesInit = {
        modelName: availableItems.availableItems.modelName,
        brandName: availableItems.availableItems.brandName,
        country: availableItems.availableItems.country,
        price: availableItems.availableItems.price,
        categoryId: availableItems.availableItems.categoryId
    };
    const [data, setData] = useState(valuesInit);
    useEffect(()=>{
        if(availableItems.availableItems.modelName!==undefined) {
            setData(availableItems.availableItems
            );
        }
       },[availableItems]);
    const handleChange=(e)=>{
        setData({ ...data, [e.target.name]: e.target.value });
    }
    return (
        <div className={classes.container}>
            {canSeeList && (
                <Typography>
                    <div>
                        <TextField name="modelName" label="Model" value={data.modelName} onChange={handleChange}/>
                        <TextField name="brandName" label="Brand" value={data.brandName} onChange={handleChange}/>
                    </div>
                    <div>
                        <TextField name="country" onChange={handleChange} label="Country" value={data.country}/>
                        <TextField name="price" onChange={handleChange} label="Price" value={data.price}/>
                        <TextField name="categoryId" onChange={handleChange} label="CategoryId" value={data.categoryId}/>
                    </div>
                    <Button onClick={() => //{//added then to redirect
                       // dispatch(fetchCreateProduct(data,
                        dispatch(fetchUpdateProduct({
                             body:data,
                            id:id,
                            }
                        )).then(()=>{
                               routeChange()
                            }
                            //  routeChange,
                        )
                        //routeChange();
                    //}
                       // console.log(JSON.stringify(data));
                    }>SAVE</Button>
                    <Button onClick={routeChange}>CANCEL</Button>
                </Typography>
            )}
        </div>
    )
};
export default CreateEdit;