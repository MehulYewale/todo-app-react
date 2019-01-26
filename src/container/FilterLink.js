import { connect } from 'react-redux'
import FilterButton from '../components/FilterButton'

const mapStateToProps = (state, ownProps) => {
    console.log('ownProps', ownProps); 
    return {
        active: ownProps.filter().type === state.filter
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log('ownProps', ownProps);
    return {
        onFilter: () => dispatch(ownProps.filter()) 
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterButton)
