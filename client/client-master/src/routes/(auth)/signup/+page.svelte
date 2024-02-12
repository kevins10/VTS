<script lang="ts">
  import axios from "axios";
  import AvatarSvg from "$lib/images/AvatarSVG.svelte";
  import { PUBLIC_API_ADDRESS } from '$env/static/public';

  const formInputStyle =
    "mt-1 w-60 text-base px-2 py-2 bg-grey-600 text-white rounded-sm focus:outline-none";

  let fileInput: HTMLInputElement;

  let fields = {
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    riotName: "",
    riotTag: "",
    userType: "",
    profilePicture: null,
  };
  let errors = {
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    riotName: "",
    riotTag: "",
    userType: "",
    profilePicture: "",
  };
  let valid = false;
  let errorMsg = "";
  let showPwd = false;

  const userTypeToggle = (event) => {
    fields.userType = event.currentTarget.value;
  };

  const togglePassword = () => {
    showPwd = !showPwd;
  };

  const handleInput = (event) => {
    fields.password = event.target.value;
  };

  const onProfilePictureSelected = (e) => {
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      if (e.target?.result === null) {
        errors.profilePicture = "Please enter a valid image";
      }
      fields.profilePicture = e.target?.result;
    };
  };

  const validateForm = () => {
    valid = true;
    if (fields.email.trim().length < 1) {
      valid = false;
      errors.email = "Email cannot be empty";
    } else {
      errors.email = "";
    }
    if (fields.password.trim().length < 1) {
      valid = false;
      errors.password = "Password cannot be empty";
      // TODO: strong passwords: at least 8 char, one upper, one lower, one num, one special
    } else {
      errors.password = "";
    }
    if (fields.username.trim().length < 1) {
      valid = false;
      errors.username = "Username cannot be empty";
    } else {
      errors.username = "";
    }
    if (fields.firstName.trim().length < 1) {
      valid = false;
      errors.firstName = "First Name cannot be empty";
    } else {
      errors.firstName = "";
    }
    if (fields.lastName.trim().length < 1) {
      valid = false;
      errors.lastName = "Last Name cannot be empty";
    } else {
      errors.lastName = "";
    }
    if (fields.phoneNumber.trim().length < 1) {
      valid = false;
      errors.phoneNumber = "Phone Number cannot be empty";
    } else {
      errors.phoneNumber = "";
    }
    if (fields.dateOfBirth.trim().length < 1) {
      valid = false;
      errors.dateOfBirth = "Date of Birth cannot be empty";
    } else {
      errors.dateOfBirth = "";
    }
    if (fields.riotName.trim().length < 1) {
      valid = false;
      errors.riotName = "Riot Name cannot be empty";
    } else {
      errors.lastName = "";
    }
    if (fields.riotTag.trim().length < 1) {
      valid = false;
      errors.riotTag = "Riot Tag cannot be empty";
    } else {
      errors.riotTag = "";
    }
    if (fields.userType.trim().length < 1) {
      valid = false;
      errors.userType = "User Type cannot be empty";
    } else {
      errors.userType = "";
    }
  };

  const submitHandler = () => {
    validateForm();

    if (valid) {
      let imageData = null;
      if (fields.profilePicture != null) {
        imageData = fields.profilePicture.split(",");
      }

      console.log(imageData);

      axios
        .post(
          `${PUBLIC_API_ADDRESS}/api/auth/register`,
          {
            email: fields.email,
            password: fields.password,
            username: fields.username,
            first_name: fields.firstName,
            last_name: fields.lastName,
            phone_number: fields.phoneNumber,
            date_of_birth: fields.dateOfBirth,
            riot_name: fields.riotName,
            riot_tag: fields.riotTag,
            user_type: fields.userType,
            profilePicture: imageData[1],
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          console.log(response.data);
          // redirect user to login page
          window.location.replace("/login");
        })
        .catch(function (error) {
          console.log(error);
          if (error.response) {
            // request was made, but server responded with a status code that falls out of the 2xx range
            errorMsg = error.response.data.message;
          } else if (error.request) {
            // request was made, but no response was received
            console.log(error.request);
          } else {
            // some other error
            console.log(error);
          }
        });
    } else {
      alert("Invalid");
    }
  };
</script>

<div class="signup bg-grey-1000">
  <div class="form form flex justify-center items-center h-screen">
    <div class="w-fit px-7 py-12 shadow-lg bg-grey-850 rounded-md">
      <div class="flex justify-center">
        <h1
          class="text-zinc-400 font-poppins font-semibold mr-8 text-4xl transition hover:text-zinc-300"
        >
          <a href="/login">LOGIN</a>
        </h1>
        <h1
          class="text-rose-200 font-poppins font-semibold text-4xl underline underline-offset-8 cursor-pointer"
        >
          SIGN UP
        </h1>
      </div>

      <form on:submit|preventDefault={submitHandler}>
        <div class="flex justify-center">
          <div class="mt-9 mx-5">
            <label for="email" class="text-base text-zinc-300 mb-2">Email</label
            ><br />
            <input
              type="email"
              id="email"
              class={formInputStyle}
              bind:value={fields.email}
            /><br />
            <div class="error text-red text-sm mt-1">{errors.email}</div>
          </div>

          <div class="mt-9 mx-5">
            <label for="password" class="text-base text-zinc-300 mb-2"
              >Password</label
            ><br />
            <div class="relative">
              <input
                type={showPwd ? "text" : "password"}
                id="password"
                class="js-password mt-1 w-60 text-base px-2 py-2 bg-grey-600 text-white rounded-sm focus:outline-none"
                on:input={handleInput}
              /><br />
              {#if showPwd}
                <button
                  on:click|preventDefault={togglePassword}
                  class="absolute top-1/2 right-3 -translate-y-1.5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-eye-slash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"
                    />
                    <path
                      d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"
                    />
                  </svg>
                </button>
              {:else}
                <button
                  on:click|preventDefault={(togglePassword) =>
                    (showPwd = !showPwd)}
                  class="absolute top-1/2 right-3 -translate-y-1.5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="%000000"
                    class="bi bi-eye-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path
                      d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                    />
                  </svg>
                </button>
              {/if}
            </div>
            <div class="error text-red text-sm mt-1">{errors.password}</div>
          </div>
        </div>

        <div class="flex justify-center">
          <div class="mt-9 mx-5">
            <label for="firstName" class="text-base text-zinc-300 mb-2"
              >First Name</label
            ><br />
            <input
              type="text"
              id="firstName"
              class={formInputStyle}
              bind:value={fields.firstName}
            /><br />
            <div class="error text-red text-sm mt-1">{errors.firstName}</div>
          </div>

          <div class="mt-9 mx-5">
            <label for="lastName" class="text-base text-zinc-300 mb-2"
              >Last Name</label
            ><br />
            <input
              type="text"
              id="lastName"
              class={formInputStyle}
              bind:value={fields.lastName}
            /><br />
            <div class="error text-red text-sm mt-1">{errors.lastName}</div>
          </div>
        </div>

        <div class="flex justify-center">
          <div class="mt-9 mx-5">
            <label for="dob" class="text-base text-zinc-300 mb-2"
              >Date of Birth</label
            ><br />
            <input
              type="date"
              id="dob"
              class={`${formInputStyle} cursor-pointer`}
              bind:value={fields.dateOfBirth}
            /><br />
            <div class="error text-red text-sm mt-1">{errors.dateOfBirth}</div>
          </div>

          <div class="mt-9 mx-5">
            <label for="phoneNumber" class="text-base text-zinc-300 mb-2"
              >Phone Number</label
            ><br />
            <input
              type="tel"
              id="phoneNumber"
              class={formInputStyle}
              bind:value={fields.phoneNumber}
            /><br />
            <div class="error text-red text-sm mt-1">{errors.phoneNumber}</div>
          </div>
        </div>

        <div class="flex justify-center">
          <div class="mt-9 mx-5">
            <label for="riotName" class="text-base text-zinc-300 mb-2"
              >Riot Name</label
            ><br />
            <input
              type="text"
              id="riotName"
              class={formInputStyle}
              bind:value={fields.riotName}
            /><br />
            <div class="error text-red text-sm mt-1">{errors.riotName}</div>
          </div>

          <div class="mt-9 mx-5">
            <label for="riotTag" class="text-base text-zinc-300 mb-2"
              >Riot Tag</label
            ><br />
            <input
              type="text"
              id="riotTag"
              class={formInputStyle}
              bind:value={fields.riotTag}
            /><br />
            <div class="error text-red text-sm mt-1">{errors.riotTag}</div>
          </div>
        </div>

        <div class="flex">
          <div class="mt-9 mx-5">
            <label for="username" class="text-base text-zinc-300 mb-2"
              >Username</label
            ><br />
            <input
              type="text"
              id="username"
              class={formInputStyle}
              bind:value={fields.username}
            /><br />
            <div class="error text-red text-sm mt-1">{errors.username}</div>
          </div>

          <div>
            <div class="mt-9 mx-5">
              <label for="admin" class="text-base text-zinc-300 mb-2"
                >User Type</label
              ><br />
            </div>
            <div class="flex justify-center items-center">
              <div class="mt-3 mx-5">
                <input
                  type="radio"
                  id="admin"
                  name="userType"
                  value="ADMIN"
                  on:change={userTypeToggle}
                />
                <label for="admin" class="text-base text-zinc-300 mb-2"
                  >Admin</label
                ><br />
              </div>

              <div class="mt-3 mx-5">
                <input
                  type="radio"
                  id="user"
                  name="userType"
                  value="USER"
                  on:change={userTypeToggle}
                />
                <label for="user" class="text-base text-zinc-300 mb-2"
                  >User</label
                ><br />
              </div>
            </div>
            <div class="error text-red text-sm mt-3.5 mx-5">
              {errors.userType}
            </div>
          </div>
        </div>

        <div class="flex justify-center">
          <div class="mt-9 mx-5 grid place-items-center">
            <label for="profilePicture" class="text-base text-zinc-300"
              >Profile Picture</label
            ><br />

            {#if fields.profilePicture}
              <img src={fields.profilePicture} alt="profile avatar" />
            {:else}
              <AvatarSvg />
            {/if}

            <button
              on:click={() => fileInput.click()}
              type="button"
              id="profilePicture"
              class="bg-rose-200 py-2 px-12 mt-5 text-white rounded-sm transition hover:bg-rose-300"
              >Upload</button
            >
            <input
              type="file"
              class="invisible"
              accept=".png, .jpg, .jpeg, .svg"
              on:change={(e) => onProfilePictureSelected(e)}
              bind:this={fileInput}
            /><br />
            <div class="error text-red text-sm mt-1">
              {errors.profilePicture}
            </div>
          </div>
        </div>

        <div class="mt-4 flex flex-row justify-center items-center">
          <button
            type="submit"
            class="bg-rose-200 py-2 px-12 text-white rounded-full transition hover:bg-rose-300"
            >Create Account</button
          >
        </div>
      </form>

      {#if errorMsg.length > 0}
        <div class="mt-10 flex flex-row justify-center items-center">
          <p class="error text-zinc-300">{errorMsg}</p>
        </div>
      {/if}
    </div>
  </div>
</div>
