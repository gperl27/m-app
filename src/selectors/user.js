import { createSelector } from 'reselect'
import moment from 'moment';

const user = state => state.user.user
const selectedDate = state => state.user.selectedDate

export const userFilteredByDateSelector = createSelector(
    user,
    selectedDate,
    (user, selectedDate) => {
        const formattedDate = selectedDate ? moment(selectedDate).format('MM-DD-YYYY') : moment().format('MM-DD-YYYY')

        const filteredTodolists = user.todolists.filter(todolist => {
           return moment(todolist.date).format('MM-DD-YYYY') === formattedDate
        })
        console.log(filteredTodolists, 'filteredtodolists');
        user.todolists = filteredTodolists
        return user;
    }
)