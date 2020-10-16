import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadUser } from '../../actions/authAction'
import { useEffect } from 'react'

function StartUp({ loadUser, children }) {

    useEffect(() => {
        loadUser();
    }, [])

    return (
        <div>
            {children}
        </div>
    )
}

StartUp.propTypes = {

}

export default connect(null, { loadUser })(StartUp)

