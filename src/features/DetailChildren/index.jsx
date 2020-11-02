import React from 'react'
import './DetailChildren.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DetailChildrenForm from './components/DetailChildrenForm';
import DetailChildrenTreeSelect from './components/DetailChildrenTreeSelect';
import { Grid } from '@material-ui/core';

function DetailChildren({listHCDB, listNCHCDB, listHCK, listHTTG, detailChildrenInfo,}) {

    const onHandleCloseDetail = () => {

    }

    return (
        <div className="detailChildren">
            <div className="detailChildren__title">Thông tin trẻ em</div>
            <div className="detailChildren__main">
                <Grid container xs={12} spacing={1}>
                    <Grid item xs={7}>
                        <DetailChildrenForm
                            onHandleCloseDetail={onHandleCloseDetail}
                            detailChildrenInfo={detailChildrenInfo}
                        />
                    </Grid>

                    <Grid item xs={5} >
                        <DetailChildrenTreeSelect
                            listHCDB={listHCDB}
                            listNCHCDB={listNCHCDB}
                            listHCK={listHCK}
                            listHTTG={listHTTG}
                            detailChildrenInfo={detailChildrenInfo}
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

DetailChildren.propTypes = {

}

const mapStateToProps = state => ({
    listHCDB : state.common.listHCDB,
    listNCHCDB : state.common.listNCHCDB,
    listHCK : state.common.listHCK,
    listHTTG : state.common.listHTTG,
    detailChildrenInfo : state.manageChildren.detailChildrenInfo,
})

export default connect(mapStateToProps, null)(DetailChildren)