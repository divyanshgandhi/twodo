import http from "../http-common";

class TodoDataService {
    // Get all todos
    getAll() {
        return http.get("/todos");
    }

    // Get all todos by list id
    getAllByListId(list_id) {
        return http.get(`/todos?list_id=${list_id}`);
    }

    // Get a todo by id
    get(id) {
        return http.get(`/todos/${id}`);
    }

    // Create a new todo
    create(data) {
        return http.post("/todos", data);
    }

    // Update a todo by id
    update(id, data) {
        return http.put(`/todos/${id}`, data);
    }

    // Delete a todo by id
    delete(id) {
        return http.delete(`/todos/${id}`);
    }
}

export default new TodoDataService();