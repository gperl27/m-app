import { createSelector } from 'reselect'
import moment from 'moment';

// const user = state => state.user.user
const todolists = state => state.user.user.todolists
const selectedDate = state => state.user.selectedDate

export const todosFilteredByDateSelector = createSelector(
    todolists,
    selectedDate,
    (todolists, selectedDate) => {
        const formattedDate = selectedDate ? moment(selectedDate).format('MM-DD-YYYY') : moment().format('MM-DD-YYYY')

        return todolists.filter(todolist => {
           return moment(todolist.date).format('MM-DD-YYYY') === formattedDate
        })
    }
)