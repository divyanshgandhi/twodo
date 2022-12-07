import React, { useState, useEffect } from 'react';
import ListDataService from '../services/list.service';
import TodoDataService from '../services/todo.service';
import Todo from './todo.component';
import { Add, CloseSharp } from '@mui/icons-material';
import { Form, Button, Row, Col } from 'react-bootstrap';

const List = () => {
    const [list, setList] = useState({});
    const [loading, setLoading] = useState(true);
    const [add, setAdd] = useState(false);
    const [userInput, setUserInput] = useState('');

    const handleAddTodo = (event, list) => {
        event.preventDefault();
        const newTodo = {
            list_id: list.id,
            title: userInput,
            description: "",
            completed: false
        }
        const addTodo = async () => {
            var data = await TodoDataService.create(newTodo);
            console.log(data);
            var newList = list;
            newList.todos.push(data.data.id);
            await ListDataService.update(list.id, newList).then(response => {
                console.log(response.data);
                setList(newList);
            });
        }
        addTodo();
        setAdd(false);
        setUserInput('');
    }

    const handleDelete = (event, todo) => {
        event.preventDefault();
        const remove = async () => {
            await TodoDataService.delete(todo.id)
                .then(response => {
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
            var newList = list;
            console.log(newList);
            const newlist = list.todos.filter((item) => item !== todo.id)
            console.log(newlist);
            await ListDataService.update(1, { "todos": newlist }).then(response => {
                console.log(response.data);
                newList.todos = newlist;
                setList(newList);
            });
        }
        remove();
        setUserInput('');
    }

    useEffect(() => {
        const fetchData = async () => {
            await ListDataService.get(1).then(result => {
                if (result) {
                    console.log(result.data);
                    setList(result.data);
                    setLoading(false);
                } else {
                    setList({});
                    setLoading(false);
                }
            });
        }
        fetchData();
    }, []);

    return (
        <div className="h-100 pl-10 pr-10 pt-6 pb-6 text-gray-600 ml-8 mr-12">
            {loading
                ? <div>Loading...</div>
                : <div className="container bg-gray-300 h-full w-[420px] rounded-lg shadow-lg p-4 hover:scale-102 ease-in" key={list.id}>
                    <div className='grid grid-cols-6'>
                        <div className='col-span-5'>
                            <div className="text-2xl font-bold">{list.title}</div>
                            <div className="text-sm mb-4">{list.description}</div>
                        </div>
                        <div className='col-span-1 mt-2'>
                            {!add ? <Add fontSize='large' onClick={(event) => {
                                setAdd(!add);
                                console.log("Add now - " + add);
                            }} /> : <CloseSharp fontSize='large' onClick={(event) => {
                                setAdd(!add);
                                console.log("Add now - " + add);
                            }} />}
                        </div>
                    </div>
                    <div>
                        {add ?
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3 col-span-1" controlId="formTodo">
                                            <Form.Control type="text" placeholder="What needs to be done?" value={userInput}
                                                onChange={item => setUserInput(item.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={3}>
                                        <Button className="mb-3 col-span-1" variant="secondary" type="submit" onClick={
                                            (event) => {
                                                handleAddTodo(event, list);
                                            }
                                        }>
                                            Add ToDo
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                            : <></>}
                    </div>
                    <div className='overflow-y-auto' style={{ height: add ? "50vh" : "58vh", overflow: "auto" }}>
                        {list.todos === [] ? <div>Empty List...</div> : list.todos.map((todo, index) => (
                            <Todo handleDelete={handleDelete} todo={todo} key={index} />
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}

export default List;