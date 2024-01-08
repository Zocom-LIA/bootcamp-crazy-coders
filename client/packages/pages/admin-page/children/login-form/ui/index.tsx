import "./style.scss";
import { ActionAlertDialog } from "@zocom/action-alert-dialog";
import { LoadingSpinner } from "@zocom/loading-spinner";
import { useData } from "../data";

export const LoginForm = () => {
  const { state, handleLogin, toggleAlertDialog, successfullyLoggedIn } =
    useData();

  return (
    <article className="login">
      <ActionAlertDialog
        success={state.serverResponse?.status == 200}
        title={state.serverResponse?.message ?? "Unexpected error"}
        isOpened={state.showAlertDialog}
        onAction={
          state.serverResponse?.status === 200 ? successfullyLoggedIn : null
        }
        onClose={() => toggleAlertDialog(false)}
      />
      <form className="login__form" onSubmit={handleLogin}>
        <section className="login__form__section">
          <h1 className="login__form__section__header">Kitchen calling!</h1>
          <fieldset className="login__form__section__field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              autoComplete="username"
              required
            />
          </fieldset>
          <fieldset className="login__form__section__field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
            />
          </fieldset>
          <section className="login__form__section__button">
            <button type="submit" disabled={state.loading}>
              {!state.loading ? "Login" : <LoadingSpinner />}
            </button>
          </section>
        </section>
      </form>
    </article>
  );
};
