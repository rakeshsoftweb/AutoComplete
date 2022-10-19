const reducer = function(state, action)
{
    switch(action.type)
    {
        case 'ORDER-DATA' :
            return {...state, orderData : action.payload};
        default :
            return null;
    }
}

export default reducer;