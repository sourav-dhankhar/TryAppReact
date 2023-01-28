import store from "../store";

const layoutSchema = (props) => {

    const screenShareReceived = store.getState().roomSlice.screenShareReceived;

    const layoutShemas = {
        '0': {
            'col-template-columns': '1fr',
            'col-template-rows': '1fr',
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth}px` : "0px"
        },
        '1': {
            'col-template-columns': '1fr',
            'col-template-rows': '1fr',
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth}px` : "0px"
        },
        '2': {
            'col-template-columns': '1fr 1fr',
            'col-template-rows': '1fr',
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth / props.userList.length - 5}px` : "0px",
        },
        '3': {
            'col-template-columns': '1fr 1fr',
            'col-template-rows': '1fr 1fr',
            'height': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientHeight / (props.userList.length - 1)) - 5}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientWidth / (props.userList.length - 1)) - 5}px` : "0px",
        },
        '4': {
            'col-template-columns': '1fr 1fr',
            'col-template-rows': '1fr 1fr',
            'height': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientHeight / (props.userList.length - 1)) - 5}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientWidth / (props.userList.length - 1)) - 5}px` : "0px",
        },
        '0M': {
            'col-template-columns': '1fr',
            'col-template-rows': '1fr',
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth}px` : "0px"
        },
        '1M': {
            'col-template-columns': '1fr',
            'col-template-rows': '1fr',
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth}px` : "0px"
        },
        '2M': {
            'col-template-columns': '1fr',
            'col-template-rows': '1fr 1fr',
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight / props.userList.length - 5}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth}px` : "0px",
        },
        '3M': {
            'col-template-columns': '1fr 1fr',
            'col-template-rows': '1fr 1fr',
            'height': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientHeight / (props.userList.length - 1)) - 5}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientWidth / (props.userList.length - 1)) - 5}px` : "0px",
        },
        '4M': {
            'col-template-columns': '1fr 1fr',
            'col-template-rows': '1fr 1fr',
            'height': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientHeight / (props.userList.length - 1)) - 5}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientWidth / (props.userList.length - 1)) - 5}px` : "0px",
        },
        '1S': {
            // 'col-template-columns' :  `${document.querySelector('#videosWrapper') ? `${0.8 * document.querySelector('#videosWrapper').clientWidth -5 }px ${0.2 * document.querySelector('#videosWrapper').clientWidth -5}px`: "0px"}`,
            // 'col-template-rows': '1fr',
            'col-template-columns': '1fr',
            'col-template-rows': '1fr',
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth}px` : "0px"
        },
        '2S': {
            'col-template-columns': '1fr 1fr',
            'col-template-rows': '1fr',
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth / props.userList.length - 5}px` : "0px",
        },
        '3S': {
            'col-template-columns': '1fr 1fr',
            'col-template-rows': '1fr 1fr',
            'height': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientHeight / (props.userList.length - 1)) - 5}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientWidth / (props.userList.length - 1)) - 5}px` : "0px",
        }
    }

    if (screenShareReceived) {
        if (document.documentElement.clientWidth < 768) {
            return layoutShemas[`${props.userList.length}SM`][props.propertyName];
        } else {
            return layoutShemas[`${props.userList.length}S`][props.propertyName];
        }
    } else {
        if (document.documentElement.clientWidth < 768) {
            return layoutShemas[`${props.userList.length}M`][props.propertyName];
        } else {
            return layoutShemas[props.userList.length][props.propertyName];
        }
    }
}

export default layoutSchema;