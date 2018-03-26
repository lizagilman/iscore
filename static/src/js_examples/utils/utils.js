///export function nullEmptyFields(obj){
//    for (var key in obj){
//        if (obj[key] == ""){
//            obj[key] = null;
//        }
//
//    }
//    return obj;
//}


const click_filer = function(filter_by, component, store, text){
    switch(filter_by){
        case("develper"):
            if(component == "projects") {
                store.filter((project)=> project.developers.name == text)
            }
            if(component == "tasks")    {
                store.filter((task)=> task.developer.name == text)
            }
            break;
        case("status"):
            if(component == "projects"){
                store.filter((project) => project.project_status == text)
            }
            if(component == "tasks"){
                store.filter((task) => task.task_status == text)
            }
            break;
        case("project"):
            store.filter((task) => task.project == text)
            break;
    }
}

export default click_filer;

