<script setup>
import { WalletMultiButton } from "solana-wallets-vue";
</script>

<template>
  <div class="navbar">
    <div class="navbar-element">
      <h3>
        Powered by
        <img src="https://effe2.xyz/avatar-daa.png" class="avatar" />
        <a href="https://twitter.com/fredericbry" target="_blank">effe2.sol</a>
      </h3>
    </div>
    <div class="navbar-element">
      <wallet-multi-button></wallet-multi-button>
    </div>
  </div>
</template>

<style scoped>
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  margin-right: 10px;
  margin-left: 10px;
  position: relative;
  top: 7px;
}

.navbar {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  background: #fff;
}
.navbar-element {
  padding-left: 30px;
  padding-right: 30px;
}
</style>
