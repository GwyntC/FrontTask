import {Button, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import useAccessValidate from "../../../hooks/useAccessValidate";
import Typography from 'components/Typography';

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
    console.log(canSeeList);
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
                    <Button>CREATE</Button>
                </Typography>
            )}
        </div>
    )
};
export default CreateEdit;