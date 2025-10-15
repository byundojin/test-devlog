// DOM 요소 가져오기
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

// 로컬 스토리지에서 todos 불러오기
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// 페이지 로드 시 todos 렌더링
document.addEventListener('DOMContentLoaded', () => {
    renderTodos();
});

// Enter 키로도 추가 가능하게
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// 추가 버튼 클릭
addBtn.addEventListener('click', addTodo);

// Todo 추가 함수
function addTodo() {
    const text = todoInput.value.trim();

    if (text === '') {
        alert('할 일을 입력해주세요!');
        return;
    }

    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(todo);
    saveTodos();
    renderTodos();

    // 입력 필드 초기화
    todoInput.value = '';
    todoInput.focus();
}

// Todo 완료/미완료 토글
function toggleTodo(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    renderTodos();
}

// Todo 삭제
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// Todos 렌더링
function renderTodos() {
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <span class="todo-text">${todo.text}</span>
            <div class="todo-actions">
                <button class="complete-btn" onclick="toggleTodo(${todo.id})">
                    ${todo.completed ? '취소' : '완료'}
                </button>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">삭제</button>
            </div>
        `;

        todoList.appendChild(li);
    });
}

// 로컬 스토리지에 저장
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
