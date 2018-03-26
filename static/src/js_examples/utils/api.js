import fetch from 'isomorphic-fetch';
import {getAllWorkers} from './queries';

export function getAllTasksApi(){
    return fetch('/devs/apis/tasks/').then( response => response.json());
}

export function getAllBugsApi(){
    return fetch('/devs/apis/bugs/').then( response => response.json());
}

export function getAllProjectsApi(){
    return fetch('/devs/apis/projects/').then( response  => response.json());
}

export function getAllDevelopersApi(){
    return fetch('/devs/apis/developers/').then( response  => response.json());
}

export function getProjectByIdApi(id){
    return fetch('/devs/apis/projects/' + id).then( response  => {
        return response.json();
    });
}


export function startEndWorking(start_end_obj){
    return fetch('/devs/apis/Start_End_Working_Day/',
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                start_end_obj
            )
        }
    )
}

export function addToDo(ToDo){
        return fetch('/devs/apis/Edd_Todo/',
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                ToDo
            )
        }
        ).then(response => response.json())
}

export function updateTodo(Todo){
    return fetch('/devs/apis/Update_Todo/',
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                Todo
            )
        }
        ).then(response => response.json())
}



export function getTaskByIdApi(id){
    return fetch('/devs/apis/tasks/' + id).then( response  => {
        return response.json();
    });
}

export function getDeveloperByIdApi(id){
    return fetch('/devs/apis/developers/' + id).then( response  => response.json());
}

export function getProjectsByDeveloperIdApi(id){
    return fetch('/devs/apis/developers/' + id + '/projects').then( response  => response.json());
}

export function getTasksByDeveloperIdApi(id){
    return fetch('/devs/apis/developers/' + id + '/tasks').then( response  => response.json());
}

export function getDevelopersByProjectIdApi(id){
    return fetch('/devs/apis/projects/' + id + '/developers').then( response  => response.json());
}

export function getNatanDevReport(){
    return fetch('/devs/apis/get_natan_dev_report/');
}

export function deleteProjectApi(id){
    return fetch("/devs/apis/projects/" + id,
        {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
}

export function deleteTaskApi(id){
    return fetch("/devs/apis/tasks/" + id,
        {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
}

export function loginApi(user, password){
     return fetch("/auth/login/",
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user,
                password: password
            })
        }
    )
}

export function getUserApi(token){
     return fetch("/auth/me/",
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Token " + token
            }
        }
    )
}

export function saveNewProjectApi(project){
    project = nullEmptyFields(project);
    return fetch("/devs/apis/projects/",
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({project})
        });
}


export function saveExistingProjectApi(project){
    project = nullEmptyFields(project);
    return fetch("/devs/apis/projects/" + project.id,
        {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({project})
        });
}

export function saveExistingTaskApi(task){
    task = nullEmptyFields(task);
    return fetch("/devs/apis/tasks/" + task.id,
        {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({task})
        }).then( response  => response.json());
}

export function saveNewTaskApi(task){
    task  = nullEmptyFields(task);
    return fetch("/devs/apis/tasks/",
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({task})
        }).then( response  => response.json());
}

export function getAllEmployeesApi(){
    return fetch('http://52.41.181.217/esg-sql-service/search/', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        body: getAllWorkers
    }).then(response => response.json());
}

export function uploadPrintScreen(blob, taskId){
    let data = new FormData();
    data.append('printScreen', new File([blob], "name"));
    //data.append('id', taskId);

    return fetch('/devs/apis/upload_print_screen_to_s3/?taskId='+taskId, {
        method: 'POST',
        mode: 'cors',
        headers: {
            //'Content-Type': false,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        body: data
    }).then(response => response.json());
}



export function uploadDescFile(file, projId){
   let data = new FormData();
    data.append('desc_file', new File([file], "name"));

    return fetch('/devs/apis/upload_project_desc_file_to_s3/?projectId='+projId, {
        method: 'POST',
        mode: 'cors',
        headers: {
            //'Content-Type': false,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        body: data
    }).then(response => response.json());
}


function nullEmptyFields(obj){
    for (var key in obj){
        if(key == 'is_bug'){
            continue;
        }
        if (obj[key] == ""){
            obj[key] = null;
        }
    }
    return obj;
}