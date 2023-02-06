import store from "../store";

function getWidthOfContainer(parentElement, value, percentage = 1) {
    if (parentElement) {
        let paddingLeft = window.getComputedStyle(parentElement, null).getPropertyValue('padding-left');
        let paddingLeftValue = Number(paddingLeft.replace('px', ''));
        let paddingRight = window.getComputedStyle(parentElement, null).getPropertyValue('padding-right');
        let paddingRightValue = Number(paddingRight.replace('px', ''));

        let width = parentElement.clientWidth - paddingRightValue - paddingLeftValue;
        width = percentage*width
        if (value == 'px') {
            return (`${width}px`);
        } else {
            return (width);
        }
    }
}

function getHeightOfContainer(parentElement, value) {
    if (parentElement) {
        let paddingTop = window.getComputedStyle(parentElement, null).getPropertyValue('padding-top');
        let paddingTopValue = Number(paddingTop.replace('px', ''));
        let paddingBottom = window.getComputedStyle(parentElement, null).getPropertyValue('padding-top');
        let paddingBottomValue = Number(paddingBottom.replace('px', ''));

        let height = parentElement.clientHeight - paddingBottomValue - paddingTopValue;
        if (value == 'px') {
            return (`${height}px`);
        } else {
            return (height);
        }
    }
}

function getWidthOfLargeGridColumn(parentElement, value) {
    if (parentElement) {
        let columnsWidth = window.getComputedStyle(parentElement, null).gridTemplateColumns.split(" ");
        let firstColumnWidth = parseInt(columnsWidth[0]);

        if (value == 'px') {
            return (`${firstColumnWidth}px`);
        } else {
            return (firstColumnWidth);
        }
    }
}

function getWidthOfSmallGridColumn(parentElement, value) {
    if (parentElement) {
        let columnsWidth = window.getComputedStyle(parentElement, null).gridTemplateColumns.split(" ");
        let secondColumnWidth = parseInt(columnsWidth[1]);

        if (value == 'px') {
            return (`${secondColumnWidth}px`);
        } else {
            return (secondColumnWidth);
        }
    }
}

function getHeightOfSmallGridColumn(parentElement, value) {
    if (parentElement) {
        let columnsWidth = window.getComputedStyle(parentElement, null).gridTemplateRows.split(" ");
        let firstRowHeight = parseInt(columnsWidth[0]);

        if (value == 'px') {
            return (`${firstRowHeight}px`);
        } else {
            return (firstRowHeight);
        }
    }
}


const layoutSchema = (props) => {

    const screenShareReceived = store.getState().roomSlice.screenShareReceived;

    const layoutShemas = {

        /* WRAPPER NORMAL STARTS */
        '0DW' : {
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridTemplateRows: '1fr',
            width: getWidthOfContainer(document.querySelector('#video-containers'), 'px'),
            height: getHeightOfContainer(document.querySelector('#video-containers'), 'px'),
        },
        '1DW': {
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridTemplateRows: '1fr',
            width: getWidthOfContainer(document.querySelector('#video-containers'), 'px'),
            height: getHeightOfContainer(document.querySelector('#video-containers'), 'px'),
        }, 
        '2DW' : {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr',
            width: getWidthOfContainer(document.querySelector('#video-containers'), 'px'),
            height: getHeightOfContainer(document.querySelector('#video-containers'), 'px'),
        }, 
        '3DW' : {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            width: getWidthOfContainer(document.querySelector('#video-containers'), 'px'),
            height: getHeightOfContainer(document.querySelector('#video-containers'), 'px'),
        },
        '4DW' : {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            width: getWidthOfContainer(document.querySelector('#video-containers'), 'px'),
            height: getHeightOfContainer(document.querySelector('#video-containers'), 'px'),
        },
        /* WRAPPER NORMAL ENDS */

        /* WRAPPER SCREENSHARE STARTS */
        '0DWS' : {
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridTemplateRows: '1fr',
            width: getWidthOfContainer(document.querySelector('#video-containers'), 'px'),
            height: getHeightOfContainer(document.querySelector('#video-containers'), 'px'),
        },
        '1DWS': {
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridTemplateRows: '1fr',
            width: getWidthOfContainer(document.querySelector('#video-containers'), 'px'),
            height: getHeightOfContainer(document.querySelector('#video-containers'), 'px'),
        }, 
        '2DWS' : {
            display: 'grid',
            gridTemplateColumns :  `${document.querySelector('#video-containers') ? `${0.8 * getWidthOfContainer(document.querySelector('#video-containers'), 'value')}px ${getWidthOfContainer(document.querySelector('#video-containers'), 'value') - 0.8 * getWidthOfContainer(document.querySelector('#video-containers'), 'value')}px`: "0px"}`,
            gridTemplateRows: `${document.querySelector('#video-containers') ? `${0.2 * getHeightOfContainer(document.querySelector('#video-containers'), 'value') }px ${getHeightOfContainer(document.querySelector('#video-containers'), 'value') - 0.2 * getHeightOfContainer(document.querySelector('#video-containers'), 'value')}px`: "0px"}`,
            width: getWidthOfContainer(document.querySelector('#video-containers'), 'px'),
            height: getHeightOfContainer(document.querySelector('#video-containers'), 'px'),
        }, 
        '3DWS' : {
            display: 'grid',
            gridTemplateColumns :  `${document.querySelector('#video-containers') ? `${0.8 * getWidthOfContainer(document.querySelector('#video-containers'), 'value')}px ${getWidthOfContainer(document.querySelector('#video-containers'), 'value') - 0.8 * getWidthOfContainer(document.querySelector('#video-containers'), 'value')}px`: "0px"}`,
            gridTemplateRows: `${document.querySelector('#video-containers') ? `repeat(2, ${0.2 * getHeightOfContainer(document.querySelector('#video-containers'), 'value') }px) ${(getHeightOfContainer(document.querySelector('#video-containers'), 'value') - 2 * 0.2 * getHeightOfContainer(document.querySelector('#video-containers'), 'value'))}px`: "0px"}`,
            width: getWidthOfContainer(document.querySelector('#video-containers'), 'px'),
            height: getHeightOfContainer(document.querySelector('#video-containers'), 'px'),
        },
        '4DWS' : {
            display: 'grid',
            gridTemplateColumns :  `${document.querySelector('#video-containers') ? `${0.8 * getWidthOfContainer(document.querySelector('#video-containers'), 'value')}px ${getWidthOfContainer(document.querySelector('#video-containers'), 'value') - 0.8 * getWidthOfContainer(document.querySelector('#video-containers'), 'value')}px`: "0px"}`,
            gridTemplateRows: `${document.querySelector('#video-containers') ? `repeat(3, ${0.2 * getHeightOfContainer(document.querySelector('#video-containers'), 'value') }px) ${(getHeightOfContainer(document.querySelector('#video-containers'), 'value') - 3 * 0.2 * getHeightOfContainer(document.querySelector('#video-containers'), 'value'))}px`: "0px"}`,
            width: getWidthOfContainer(document.querySelector('#video-containers'), 'px'),
            height: getHeightOfContainer(document.querySelector('#video-containers'), 'px'),
        },

        /* WRAPPER SCREENSHARE ENDS */


        /* NORMAL CHILDREN DESKTOP STARTS */
        '0DNC': {
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight - 10}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth - 10}px` : "0px"
        },
        '1DNC': {
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth}px` : "0px"
        },
        '2DNC': {
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight - 10}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth / props.userList.length - 10}px` : "0px",
        },
        '3DNC': {
            'height': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientHeight / (props.userList.length - 1) - 10)}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientWidth / (props.userList.length - 1) - 10)}px` : "0px",
        },
        '4DNC': {
            'height': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientHeight / (props.userList.length - 1) -10)}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientWidth / (props.userList.length - 1) -10)}px` : "0px",
        },

        /* NORMAL CHILDREN DESKTOP ENDS */

        /* NORMAL CHILDREN MOBILE STARTS */
        '0MNC': {
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight - 5}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth - 5}px` : "0px"
        },
        '1MNC': {
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth}px` : "0px"
        },
        '2MNC': {
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight / props.userList.length - 5}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth - 5}px` : "0px",
        },
        '3MNC': {
            'height': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientHeight / (props.userList.length - 1) - 5)}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientWidth / (props.userList.length - 1) - 5)}px` : "0px",
        },
        '4MNC': {
            'height': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientHeight / (props.userList.length - 1) - 5)}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientWidth / (props.userList.length - 1) - 5)}px` : "0px",
        },

        /* NORMAL CHILDREN MOBILE ENDS */


        /* BIG CHILDREN DESKTOP STARTS */
        '0DBC': {
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight - 10}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth - 10}px` : "0px"
        },
        '1DBC': {
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight - 10}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth - 10}px` : "0px"
        },
        '2DBC': {
            gridRow : `1 / span ${props.userList.length}`,
            width :  document.querySelector('#videosWrapper') ? `${getWidthOfLargeGridColumn(document.querySelector('#videosWrapper'), 'value') - 10}px` : "0px",
            height: document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight - 10}px` : "0px",
        },
        '3DBC': {
            gridRow : `1 / span ${props.userList.length}`,
            width :  document.querySelector('#videosWrapper') ? `${getWidthOfLargeGridColumn(document.querySelector('#videosWrapper'), 'value') - 10}px` : "0px",
            height: document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight - 10}px` : "0px",
        },
        '4DBC': {
            gridRow : `1 / span ${props.userList.length}`,
            width :  document.querySelector('#videosWrapper') ? `${getWidthOfLargeGridColumn(document.querySelector('#videosWrapper'), 'value') - 10}px` : "0px",
            height: document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight - 10}px` : "0px",
        },

        /* BIG CHILDREN DESKTOP ENDS */
        /* BIG CHILDREN MOBILE STARTS */
        '0MBC': {
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight - 5}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth - 5}px` : "0px"
        },
        '1MBC': {
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight - 5}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth - 5}px` : "0px"
        },
        '2MBC': {
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight - 5}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth / props.userList.length - 5}px` : "0px",
        },
        '3MBC': {
            'height': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientHeight / (props.userList.length - 1) - 5)}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientWidth / (props.userList.length - 1) - 5)}px` : "0px",
        },
        '4MBC': {
            'height': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientHeight / (props.userList.length - 1) - 5)}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientWidth / (props.userList.length - 1) - 5)}px` : "0px",
        },

        /* BIG CHILDREN MOBILE ENDS */


        /* SMALL CHILDREN DESKTOP STARTS */
        '0DSC': {
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight - 5}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth - 5}px` : "0px"
        },
        '1DSC': {
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight - 5}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth - 5}px` : "0px"
        },
        '2DSC': {
            gridColumn: '2',
            aspectRation: '1',
            height : document.querySelector('#videosWrapper') ? `${getHeightOfSmallGridColumn(document.querySelector('#videosWrapper'), 'value') - 5}px` : "0px",
        },
        '3DSC': {
            gridColumn: '2',
            aspectRation: '1',
            height : document.querySelector('#videosWrapper') ? `${getHeightOfSmallGridColumn(document.querySelector('#videosWrapper'), 'value') - 5}px` : "0px",
        },
        '4DSC': {
            gridColumn: '2',
            aspectRation: '1',
            height : document.querySelector('#videosWrapper') ? `${getHeightOfSmallGridColumn(document.querySelector('#videosWrapper'), 'value') - 5}px` : "0px",
        },

        /* SMALL CHILDREN DESKTOP ENDS */

        '1SP': {
            'col-template-columns' :  `${document.querySelector('#videosWrapper') ? `${0.8 * document.querySelector('#videosWrapper').clientWidth }px ${0.2 * document.querySelector('#videosWrapper').clientWidth}px`: "0px"}`,
            'col-template-rows': '1fr',
            // 'col-template-columns': '1fr',
            // 'col-template-rows': '1fr',
            // 'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight}px` : "0px",
            // 'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth}px` : "0px"
        },
        '2SP': {
            'col-template-columns' :  `${document.querySelector('#videosWrapper') ? `${0.8 * document.querySelector('#videosWrapper').clientWidth }px ${0.2 * document.querySelector('#videosWrapper').clientWidth}px`: "0px"}`,
            'col-template-rows': `${document.querySelector('#videosWrapper') ? `${0.2 * document.querySelector('#videosWrapper').clientHeight }px ${0.8 * document.querySelector('#videosWrapper').clientHeight}px`: "0px"}`,
        },
        '3S': {
            'col-template-columns' :  `${document.querySelector('#videosWrapper') ? `${0.8 * document.querySelector('#videosWrapper').clientWidth }px ${0.2 * document.querySelector('#videosWrapper').clientWidth}px`: "0px"}`,
            'col-template-rows': '1fr',
            // 'col-template-columns': '1fr 1fr',
            // 'col-template-rows': '1fr 1fr',
            // 'height': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientHeight / (props.userList.length - 1))}px` : "0px",
            // 'width': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientWidth / (props.userList.length - 1))}px` : "0px",
        },
    }


    if (props.role == 'wrapper') {
        if (screenShareReceived) {
            if (document.documentElement.clientWidth < 768) {
                return layoutShemas[`${props.userList.length}MWS`];
            } else {
                console.log('videoContainer style ', layoutShemas[`${props.userList.length}DWS`]);
                return layoutShemas[`${props.userList.length}DWS`];
            }
        } else {
            if (document.documentElement.clientWidth < 768) {
                return layoutShemas[`${props.userList.length}MW`];
            } else {
                console.log('videoContainer style ', layoutShemas[`${props.userList.length}DW`]);
                return layoutShemas[`${props.userList.length}DW`];
            }
        }
    } else if (props.role == 'normalChildren') {
        if (document.documentElement.clientWidth < 768) {
            return layoutShemas[`${props.userList.length}MNC`];
        } else {
            return layoutShemas[`${props.userList.length}DNC`];
        }
    } else if (props.role == 'bigChildren') {
        if (document.documentElement.clientWidth < 768) {
            return layoutShemas[`${props.userList.length}MBC`];
        } else {
            console.log('big children layout ', layoutShemas[`${props.userList.length}DBC`]);
            return layoutShemas[`${props.userList.length}DBC`];
        }
    } else if (props.role == 'smallChildren') {
        if (document.documentElement.clientWidth < 768) {
            return layoutShemas[`${props.userList.length}MSC`];
        } else {
            console.log('small children layout ', layoutShemas[`${props.userList.length}DSC`]);
            return layoutShemas[`${props.userList.length}DSC`];
        }
    }
}

export default layoutSchema;