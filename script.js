document.addEventListener('DOMContentLoaded', function() {
    // 加载对话数据
    fetch('./chat-data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const messages = data.data.biz_data.chat_messages;
            const chatContainer = document.getElementById('chat-messages');
            
            if (!messages || messages.length === 0) {
                chatContainer.innerHTML = '<p>没有找到对话消息</p>';
                return;
            }
            
            messages.forEach(message => {
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${message.role.toLowerCase()}-message`;
                
                const roleDiv = document.createElement('div');
                roleDiv.className = 'message-role';
                roleDiv.textContent = message.role === 'USER' ? '用户' : 'AI助手';
                
                const contentP = document.createElement('div');
                contentP.className = 'message-content';
                
                // 处理换行和格式
                const formattedContent = message.content
                    .replace(/\n/g, '<br>')
                    .replace(/\[citation:\d+\]/g, '');
                
                contentP.innerHTML = formattedContent;
                
                messageDiv.appendChild(roleDiv);
                messageDiv.appendChild(contentP);
                chatContainer.appendChild(messageDiv);
            });
        })
        .catch(error => {
            console.error('Error loading chat data:', error);
            document.getElementById('chat-messages').innerHTML = 
                `<p style="color: red;">加载对话数据失败: ${error.message}</p>`;
        });
}); 