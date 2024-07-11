import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import "./style.css";
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
  <Provider store={store}>
    <App />
  </Provider>,
  </QueryClientProvider>,
  document.getElementById("root")
);
