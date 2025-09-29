import { useState, useRef, useEffect } from 'react';

import { Send, Bot, User, Loader2, AlertCircle } from 'lucide-react';

import { Card } from '../components/Card';

import { Button } from '../components/Button';

import { MarkdownRenderer } from '../components/MarkdownRenderer';

import { enviarParaIA } from '../services/aiService';
 
export const ChatIA = () => {

  const [messages, setMessages] = useState([

    {

      id: 1,

      type: 'bot',

      content: 'Olá! Sou sua assistente de IA especializada em psicologia. Como posso ajudá-lo hoje?',

      timestamp: new Date()

    }

  ]);

  const [inputMessage, setInputMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);
 
  const scrollToBottom = () => {

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  };
 
  useEffect(() => {

    scrollToBottom();

  }, [messages]);
 
 
  const handleSendMessage = async () => {

    if (!inputMessage.trim()) return;
 
    const userMessage = {

      id: Date.now(),

      type: 'user',

      content: inputMessage,

      timestamp: new Date()

    };
 
    setMessages(prev => [...prev, userMessage]);

    const currentInput = inputMessage;

    setInputMessage('');

    setIsLoading(true);

    setError(null);
 
    try {

      const aiResponse = await enviarParaIA(currentInput, messages);

      const botMessage = {

        id: Date.now() + 1,

        type: 'bot',

        content: aiResponse,

        timestamp: new Date()

      };
 
      setMessages(prev => [...prev, botMessage]);

    } catch (err) {

      setError(err.message);

      const errorMessage = {

        id: Date.now() + 1,

        type: 'bot',

        content: `Desculpe, ocorreu um erro: ${err.message}`,

        timestamp: new Date(),

        isError: true

      };

      setMessages(prev => [...prev, errorMessage]);

    } finally {

      setIsLoading(false);

    }

  };
 
  const handleKeyPress = (e) => {

    if (e.key === 'Enter' && !e.shiftKey) {

      e.preventDefault();

      handleSendMessage();

    }

  };
 
  return (
<div className="max-w-4xl mx-auto">
<div className="mb-8">
<h1 className="text-3xl font-bold text-dark mb-2">Chat com IA</h1>

</div>
 
      <Card className="h-[600px] flex flex-col">

        {/* Messages Area */}
<div className="flex-1 overflow-y-auto p-6 space-y-4">

          {messages.map((message) => (
<div

              key={message.id}

              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
>
<div className={`flex items-start space-x-3 max-w-[80%] ${

                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''

              }`}>
<div className={`w-8 h-8 rounded-full flex items-center justify-center ${

                  message.type === 'user' 

                    ? 'bg-light text-white' 

                    : 'bg-accent text-white'

                }`}>

                  {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
</div>
<div className={`rounded-2xl px-4 py-3 ${

                  message.type === 'user'

                    ? 'bg-light text-white'

                    : message.isError

                    ? 'bg-red-100 text-red-800 border border-red-200'

                    : 'bg-gray-100 text-gray-800'

                }`}>

                  {message.type === 'user' ? (
<p className="text-sm leading-relaxed">{message.content}</p>

                  ) : (
<div className="text-sm">
<MarkdownRenderer content={message.content} />
</div>

                  )}
<p className="text-xs opacity-70 mt-2">

                    {message.timestamp.toLocaleTimeString('pt-BR', { 

                      hour: '2-digit', 

                      minute: '2-digit' 

                    })}
</p>
</div>
</div>
</div>

          ))}

          {isLoading && (
<div className="flex justify-start">
<div className="flex items-start space-x-3 max-w-[80%]">
<div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center">
<Bot size={16} />
</div>
<div className="bg-gray-100 rounded-2xl px-4 py-3">
<div className="flex items-center space-x-2">
<Loader2 size={16} className="animate-spin text-accent" />
<span className="text-sm text-gray-600">Pensando...</span>
</div>
</div>
</div>
</div>

          )}
<div ref={messagesEndRef} />
</div>
 
        {/* Input Area */}
<div className="border-t border-gray-200 p-4">
<div className="flex space-x-3">
<textarea

              value={inputMessage}

              onChange={(e) => setInputMessage(e.target.value)}

              onKeyPress={handleKeyPress}

              placeholder="Digite sua pergunta..."

              className="flex-1 resize-none border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-light focus:border-transparent"

              rows="2"

              disabled={isLoading}

            />
<Button

              onClick={handleSendMessage}

              disabled={!inputMessage.trim() || isLoading}

              className="self-end"
>
<Send size={18} />
</Button>
</div>
</div>
</Card>
 
      {error && (
<div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
<AlertCircle size={20} className="text-red-500" />
<span className="text-red-700">{error}</span>
</div>

      )}
 
      
        

          

</div>


  );

};
   