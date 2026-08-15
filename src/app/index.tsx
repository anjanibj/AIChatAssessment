
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};


const welcomeMessage: Message = {
  id: 'welcome',
  text: 'Hello! 👋 I am your AI Assistant. How can I help you today?',
  sender: 'ai',
};

export default function HomeScreen() {
  const [messages, setMessages] = useState<Message[]>([
    welcomeMessage,
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Save chat whenever messages change
 

  

  const sendMessage = async () => {
    const text = input.trim();

    if (!text || loading) {
      return;
    }

    setInput('');
    setError('');

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setLoading(true);

    try {
      const response = await fetch(
        'http://localhost:3001/chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: text,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Server error'
        );
      }

      const aiMessage: Message = {
        id: `${Date.now()}-ai`,
        text: data.reply,
        sender: 'ai',
      };

      setMessages((previous) => [
        ...previous,
        aiMessage,
      ]);
    } catch (error) {
      console.error('Chat error:', error);

      setError(
        'Unable to connect to AI. Please make sure the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
  console.log('CLEAR BUTTON CLICKED');

  setMessages([]);
  setInput('');
  setError('');

  setTimeout(() => {
    setMessages([welcomeMessage]);
  }, 100);
};

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >

        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>
              AI Assistant
            </Text>

            <Text style={styles.subtitle}>
              Your intelligent conversation partner
            </Text>
          </View>

          <Pressable
            onPress={clearChat}
            style={styles.clearButton}
          >
            <Text style={styles.clearText}>
              Clear
            </Text>
          </Pressable>
        </View>

        {/* MESSAGES */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatArea}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageRow,
                item.sender === 'user'
                  ? styles.userRow
                  : styles.aiRow,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  item.sender === 'user'
                    ? styles.userBubble
                    : styles.aiBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    item.sender === 'user'
                      ? styles.userText
                      : styles.aiText,
                  ]}
                >
                  {item.text}
                </Text>
              </View>
            </View>
          )}
        />

        {/* LOADING */}
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="small" />

            <Text style={styles.loadingText}>
              AI is thinking...
            </Text>
          </View>
        )}

        {/* ERROR */}
        {error !== '' && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>
              {error}
            </Text>
          </View>
        )}

        {/* INPUT */}
        <View style={styles.inputArea}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Message AI Assistant..."
            placeholderTextColor="#888"
            multiline
            style={styles.input}
            editable={!loading}
          />

          <Pressable
            onPress={sendMessage}
            disabled={
              !input.trim() || loading
            }
            style={[
              styles.sendButton,
              (!input.trim() || loading) &&
                styles.disabledButton,
            ]}
          >
            <Text style={styles.sendText}>
              ➤
            </Text>
          </Pressable>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  header: {
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },

  subtitle: {
    marginTop: 3,
    fontSize: 13,
    color: '#6B7280',
  },

  clearButton: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },

  clearText: {
    color: '#4F46E5',
    fontWeight: '700',
  },

  chatArea: {
    padding: 16,
    paddingBottom: 20,
  },

  messageRow: {
    width: '100%',
    marginBottom: 12,
  },

  userRow: {
    alignItems: 'flex-end',
  },

  aiRow: {
    alignItems: 'flex-start',
  },

  messageBubble: {
    maxWidth: '82%',
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderRadius: 18,
  },

  userBubble: {
    backgroundColor: '#4F46E5',
    borderBottomRightRadius: 5,
  },

  aiBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  messageText: {
    fontSize: 16,
    lineHeight: 23,
  },

  userText: {
    color: '#FFFFFF',
  },

  aiText: {
    color: '#1F2937',
  },

  loading: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },

  loadingText: {
    marginLeft: 8,
    color: '#6B7280',
  },

  errorBox: {
    margin: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
  },

  errorText: {
    color: '#B91C1C',
    fontSize: 13,
  },

  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 110,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    fontSize: 16,
    color: '#111827',
    marginRight: 10,
  },

  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  disabledButton: {
    opacity: 0.4,
  },

  sendText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
});