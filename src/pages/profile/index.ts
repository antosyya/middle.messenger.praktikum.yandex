import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import Block from "../../services/Block";
import { getForm, validateInput } from "../../services/validateForm";
import store, { StoreEvents } from "../../store/store";
import authController from "../../store/AuthController";
import { connect } from "../../services/connect";
import { isEqual } from "../../services/isEqual";
import userController from "../../store/UserController";
import { IProfile, UserPassword } from "../../types/User";
import { Link } from "../../components/Link";
import { ROUTES } from "../../services/routersList";
import { router } from "../../services/Router";
import { Avatar } from "../../components/Avatar";
class ProfilePage extends Block {
  constructor() {
    store.on(StoreEvents.Updated, () => {
      // вызываем обновление компонента, передав данные из хранилища
      this.setProps(store.getState());
    }),
      super({
        // InputAvatar: new Input({
        //   type: "file",
        //   id: "avatar",
        //   name: "avatar",
        //   placeholder: "фото",
        //   className: "avatar",
        //   change: async (event: Event) => {
        //     if (event.target instanceof HTMLInputElement && event.target.files) {
        //       userController.changeAvatar(event.target.files[0]);
        //     }
        //   },
        // }),
        OutButton: new Button({
          text: "Выйти",
          onClick: () => {
            authController.logout();
          },
        }),
        Link: new Link({
          text: "Чаты",
          onClick: () => {
            router.go(ROUTES.CHATS);
          },
        }),
      });
  }
  protected override componentDidMount(): void {
    store.getState().user;
  }
  override componentDidUpdate(
    oldProps: Record<string, any> | null | undefined,
    newProps: Record<string, any> | null | undefined
  ): boolean {
    console.log("componentDidUpdate called");
    console.log("oldProps:", oldProps);
    console.log("newProps:", newProps);
    const oldUser = oldProps?.user;
    const newUser = newProps?.user;
    console.log("oldProps:", oldUser?.avatar);
    console.log("newProps:", newUser?.avatar);
    const isChangeData = !!newProps?.user && !isEqual(oldUser, newUser);

    const userData = typeof newUser === "string" ? newUser : newUser;

    const isChangeAvatar =
      !!newProps?.user?.avatar &&
      oldProps?.user?.avatar !== newProps?.user?.avatar;

    // if (isChangeData || isChangeAvatar) {
    //   this.setChildren({
    //     Avatar: new Avatar({
    //       avatar: newProps?.user?.avatar
    //         ? `https://ya-praktikum.tech/api/v2/resources${newProps.user.avatar}`
    //         : "/img/user.svg",
    //     }),
    //   });
    // }

    if (isChangeData) {
      this.setChildren({
        InputAvatar: new Input({
          type: "file",
          id: "avatar",
          name: "avatar",
          placeholder: "фото",
          className: "avatar",
          value: userData?.avatar
            ? `https://ya-praktikum.tech/api/v2/resources${userData.avatar}`
            : "/img/user.svg",
          change: async (event: Event) => {
            if (
              event.target instanceof HTMLInputElement &&
              event.target.files
            ) {
              const response = await userController.changeAvatar(
                event.target.files[0]
              );
              store.set("user", {
                ...store.getState().user,
                avatar: response.avatar,
              });
              this.setProps({
                user: { ...store.getState().user },
              });
            }
          },
        }),
        Avatar: new Avatar({
          avatar: newProps?.user?.avatar
            ? `https://ya-praktikum.tech/api/v2/resources${userData.avatar}`
            : "/img/user.svg",
        }),
        InputName: new Input({
          type: "text",
          id: "name",
          name: "first_name",
          value: userData.first_name,
          placeholder: "имя",
          className: "input",
          blur: (event: Event) => {
            validateInput(event.target as HTMLInputElement);
          },
        }),
        InputSecondName: new Input({
          type: "text",
          id: "lastname",
          name: "second_name",
          value: userData.second_name,
          placeholder: "фамилия",
          className: "input",
          blur: (event: Event) => {
            validateInput(event.target as HTMLInputElement);
          },
        }),
        InputLogin: new Input({
          type: "text",
          id: "login-register",
          name: "login",
          value: userData?.login,
          placeholder: "логин",
          className: "input",
          blur: (event: Event) => {
            validateInput(event.target as HTMLInputElement);
          },
        }),
        InputEmail: new Input({
          type: "text",
          id: "email",
          name: "email",
          value: userData?.email,
          placeholder: "email",
          className: "input",
          blur: (event: Event) => {
            validateInput(event.target as HTMLInputElement);
          },
        }),
        InputPhone: new Input({
          type: "tel",
          id: "phone",
          name: "phone",
          value: userData?.phone,
          placeholder: "телефон",
          className: "input",
          blur: (event: Event) => {
            validateInput(event.target as HTMLInputElement);
          },
        }),
        InputOldPassword: new Input({
          type: "password",
          id: "old-password",
          name: "oldPassword",
          placeholder: "пароль",
          className: "input",
          blur: (event: Event) => {
            validateInput(event.target as HTMLInputElement);
          },
        }),
        InputNewPassword: new Input({
          type: "password",
          id: "new-password",
          name: "newPassword",
          placeholder: "пароль",
          className: "input",
          blur: (event: Event) => {
            validateInput(event.target as HTMLInputElement);
          },
        }),
        Button: new Button({
          text: "Изменить",
          onClick: (e: Event) => {
            e.preventDefault();
            const data = getForm("profile-form");
            userController.changeProfile(data as IProfile);
          },
        }),
        ButtonPassword: new Button({
          text: "Изменить пароль",
          onClick: (e: Event) => {
            e.preventDefault();
            const data = getForm("profile-password-form");
            userController.changePassword(data as UserPassword);
          },
        }),
      });
    }
    return true;
  }
  protected render(): string {
    return `<div class="container">
                    <main class="main">
                        <h1>Профиль</h1>
                        <form class="form" id="profile-avatar-form">
                        {{{Avatar}}}
                            {{{InputAvatar}}} 
                        </form>
                        <form class="form" id="profile-form">
                           
                            <label for="first_name">Имя</label>
                            {{{InputName}}}    
                            <span class="error"></span>
                            <label for="second_name">Фамилия</label>
                            {{{InputSecondName}}}    
                            <span class="error"></span>
                            <label for="login">Логин</label>  
                            {{{InputLogin}}}
                            <span class="error"></span>
                            <label for="email">E-mail</label>  
                            {{{InputEmail}}}
                            <span class="error"></span>
                            <label for="phone">Телефон</label>
                            {{{InputPhone}}}    
                            <span class="error"></span>
                              
                            {{{ Button }}} 
                        </form>
                        <form class="form" id="profile-password-form">
                            <label for="oldPassword">Старый пароль</label>
                            {{{InputOldPassword}}}  
                            <label for="newPassword">Новый пароль</label>
                            {{{InputNewPassword}}}  
                            {{{ ButtonPassword }}} 
                        </form>
                         {{{ OutButton }}}  
                          {{{Link}}}
                    </main>
                    </div>`;
  }
}
const Profile = connect((state) => ({ user: state.user }))(ProfilePage);

export default Profile;
