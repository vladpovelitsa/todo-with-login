<template>
  <article class="user-card">
    <h2 class="user-card__name">{{ user.name }}</h2>
    <div class="user-card__company">
      <p class="user-card__company-name">
        Company: <strong>{{ user.company.name }}</strong>
      </p>
      <p class="user-card__company-slogan">
        Slogan: <strong>{{ user.company.catchPhrase }}</strong>
      </p>
    </div>

    <address class="user-card__contacts">
      <h3 class="user-card__contacts-title">Contacts:</h3>
      <ul class="user-card__contacts-list">
        <li class="user-card__contacts-item">
          <a class="user-card__contacts-link" :href="`mailto:${user.email}`">
            Send email
          </a>
        </li>
        <li class="user-card__contacts-item">
          <a class="user-card__contacts-link" :href="`mailto:${user.phone}`">
            Call
          </a>
        </li>
        <li class="user-card__contacts-item">
          <a
            class="user-card__contacts-link"
            :href="user.website"
            target="_blank"
          >
            Visit website
          </a>
        </li>
      </ul>
    </address>
  </article>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.user-card {
  background: #c4c4c4;
  border-radius: 5px;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 25px;
  box-sizing: border-box;
  &__name {
    background: #a5a5a5;
    border-radius: 5px 5px 0 0;
    padding: 10px 15px;
    margin: 0;
    font-size: 18px;
  }
  &__company {
    padding: 0 15px;
    font-size: 12px;
    &-name,
    &-slogan {
      margin: 5px 0;
    }
  }
  &__contacts {
    padding: 0 15px;
    font-style: normal;
    &-list {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      margin: 0;
      gap: 5px;
      box-sizing: border-box;
    }
    &-link {
      text-decoration: none;
      background: #519945;
      border-radius: 5px;
      padding: 5px 10px;
      color: #fff;
      font-weight: 400;
      font-size: 14px;
      box-sizing: border-box;
      display: block;
    }
    &-title {
      margin: 0 0 10px;
      font-size: 18px;
    }
  }
}
</style>
