const layoutSchema = (props) => {
    const layoutShemas = {
        '0' : {
            'col-template-columns' : '1fr',
            'col-template-rows': '1fr',
            'height' : document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight }px` : "0px",
            'width' : document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth }px` : "0px"
        },
        '1' : {
            'col-template-columns' : '1fr',
            'col-template-rows': '1fr',
            'height' : document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight }px` : "0px",
            'width' : document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth }px` : "0px"
        },
        '2' : {
            'col-template-columns' : '1fr 1fr',
            'col-template-rows': '1fr',
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight  }px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth / props.userList.length - 5}px` : "0px",
        },
        '3' : {
            'col-template-columns' : '1fr 1fr',
            'col-template-rows': '1fr 1fr',
            'height': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientHeight / (props.userList.length -1)) - 5 }px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientWidth / (props.userList.length -1)) -5 }px` : "0px",
        },
        '4' : {
            'col-template-columns' : '1fr 1fr',
            'col-template-rows': '1fr 1fr',
            'height': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientHeight / (props.userList.length -1)) - 5 }px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientWidth / (props.userList.length -1)) -5 }px` : "0px",
        },
        '0M' : {
            'col-template-columns' : '1fr',
            'col-template-rows': '1fr',
            'height' : document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight }px` : "0px",
            'width' : document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth }px` : "0px"
        },
        '1M' : {
            'col-template-columns' : '1fr',
            'col-template-rows': '1fr',
            'height' : document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight }px` : "0px",
            'width' : document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth }px` : "0px"
        },
        '2M' : {
            'col-template-columns' : '1fr',
            'col-template-rows': '1fr 1fr',
            'height': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientHeight / props.userList.length - 5}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${document.querySelector('#videosWrapper').clientWidth }px` : "0px",
        },
        '3M' : {
            'col-template-columns' : '1fr 1fr',
            'col-template-rows': '1fr 1fr',
            'height': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientHeight / (props.userList.length - 1)) - 5}px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientWidth / (props.userList.length - 1)) - 5}px` : "0px",
        },
        '4M' : {
            'col-template-columns' : '1fr 1fr',
            'col-template-rows': '1fr 1fr',
            'height': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientHeight / (props.userList.length - 1)) -5 }px` : "0px",
            'width': document.querySelector('#videosWrapper') ? `${(document.querySelector('#videosWrapper').clientWidth / (props.userList.length - 1)) - 5 }px` : "0px",
        }
    }
    if (document.documentElement.clientWidth < 768) { 
        return layoutShemas[`${props.userList.length}M`][props.propertyName];
    } else {
        return layoutShemas[props.userList.length][props.propertyName];
    }
}

export default layoutSchema;