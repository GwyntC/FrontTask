import {Button, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import useAccessValidate from "../../../hooks/useAccessValidate";
import Typography from 'components/Typography';
import {useHistory, useParams, useRouteMatch} from "react-router-dom";

const getClasses = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
}));
const CreateEdit = ({
                        authorities,
                    }) => {
    console.log(authorities);
    const classes = getClasses();
    const canSeeList = useAccessValidate({
        ownedAuthorities: authorities,
        neededAuthorities: ['МОЖНО_ВОТ_ЭТУ_ШТУКУ'],
    });
    const history=useHistory();
    const routeChange = () =>{
        let path = `initial`;
        history.push(path);
    }
    const { id }=useParams();
    return (
        <div className={classes.container}>
            {canSeeList && (
                <Typography>
                    <div>
                    <TextField id="model" label="Model"/>
                    <TextField id="brand" label="Brand"/>
                    </div>
                    <div>
                    <TextField id="country" label="Country"/>
                    <TextField id="price" label="Price"/>
                    <TextField id="category" label="CategoryId"/>
                    </div>
                    <Button onClick={routeChange}>CREATE</Button>
                </Typography>
            )}
        </div>
    )
};
export default CreateEdit;