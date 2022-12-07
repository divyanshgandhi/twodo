import React, { useState, useEffect } from 'react';
import TodoDataService from '../services/todo.service';
import { Edit, Delete } from '@mui/icons-material';
import { Modal, Box, Typography } from '@mui/material';
import { Form, Button, Row, Col } from 'react-bootstrap';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Todo = (props) => {
    const todo_id = props.todo;
    const handleDelete = props.handleDelete;

    const [todo, setTodo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [checked, setChecked] = useState(false);

    const [todoTitleIn, setTodoTileIn] = useState('');
    const [todoDescIn, setTodoDescIn] = useState('');
    const [todoCheckedIn, setTodoDateIn] = useState(false);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (switched, todo) => {
        const newTodo = {
            id: todo.id,
            list_id: todo.list_id,
            title: todo.title,
            description: todo.description,
            completed: !switched,
        };
        console.log("Switched is " + todo.id + " " + todo.list_id + " " + switched);
        handleEdit(switched, newTodo);
        setChecked(!switched);
    };

    const handleEdit = (event, todo) => {
        const edit = async () => {
            await TodoDataService.update(todo.id, todo)
                .then(response => {
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
        edit();
    }

    useEffect(() => {
        const fetchData = async () => {
            await TodoDataService.get(todo_id).then(result => {
                setTodo(result.data);
                setChecked(result.data.completed);
                setLoading(false);
            });
        }
        fetchData();
    }, []);

    return (
        <div className="container mx-auto text-black">
            <div className="grid grid-cols-1">
                {loading
                    ? <div>Loading...</div>
                    : <div className="bg-white min-w-max h-auto rounded-lg shadow-md mt-3 p-2" key={todo.id}>
                        <div className='grid grid-cols-9'>
                            <div className='col-span-1 mt-2 ml-2'>
                                <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" checked={checked} onChange={() => handleChange(checked, todo)} />
                            </div>
                            <div className='col-span-6'>
                                {checked
                                    ? <div className='line-through text-gray-400'>
                                        <div className="text-sm font-bold">{todo.title}</div>
                                        {todo.description ? <div className="text-xs">{todo.description}</div> : <div className="text-xs italic text-gray-300">Empty description</div>}
                                    </div>
                                    : <>
                                        <div className="text-sm font-bold">{todo.title}</div>
                                        {todo.description ? <div className="text-xs">{todo.description}</div> : <div className="text-xs italic text-gray-300">Empty description</div>}
                                    </>}
                            </div>
                            <div className='col-span-2 mr-2 mt-1'>
                                <Edit className='mr-4 ml-4' onClick={(event) =>
                                    handleOpen()
                                } />
                                <Delete color='error' onClick={(event) =>
                                    handleDelete(event, todo)
                                } />
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Form>
                                            <Row>
                                                <Col>
                                                    <Form.Group className="mb-3" controlId="formTodoTitle">
                                                        <Form.Control type="text" placeholder={todo.title} value={todoTitleIn} onChange={(event) => setTodoTileIn(event.target.value)} />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formTodoDesc">
                                                        <Form.Control type="text" placeholder={todo.description ? todo.description : "Enter description for this task"} value={todoDescIn} onChange={(event) => setTodoDescIn(event.target.value)} />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="mb-3 mt-1.5" controlId="formTodoCompleted">
                                                        <Form.Check type="checkbox" label="Completed" checked={todoCheckedIn} onChange={(event) => setTodoDateIn(event.target.checked)} />
                                                    </Form.Group>
                                                    <Button className="mb-3" variant="secondary" type="submit" onClick={
                                                        (event) => {
                                                            const newTodo = {
                                                                id: todo.id,
                                                                list_id: todo.list_id,
                                                                title: todoTitleIn,
                                                                description: todoDescIn,
                                                                completed: todoCheckedIn,
                                                            };
                                                            handleEdit(event, newTodo);
                                                        }
                                                    }>
                                                        Edit
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Box>
                                </Modal>
                            </div>
                        </div>
                    </div>}
            </div>
        </div>
    );
}

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

export default Todo;
