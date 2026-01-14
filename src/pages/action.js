const fetchNoteDetailsFromCloud = function() {
    return (dispatch, getState) => {
        dispatch({type: 'START_FETCH_NOTE_DETAILS'})
        setTimeout(() => {
            
        fetch('./static/note_details.json').then(async (res)=> {
            const details = await res.json();
            dispatch({type: 'FETCH_NOTE_DETAILS_SUCCESS', payload: details.data })
        })
        }, 2000);
    }
}

export {
    fetchNoteDetailsFromCloud
}