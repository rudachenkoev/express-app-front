<template>
  <div class="w-screen h-screen">
    <div class="size-full md:h-1/2 bg-primary">
      <div class="container h-full mx-auto relative flex justify-center md:justify-start md:items-end p-6 md:p-0">
        <div class="hidden lg:flex justify-between items-center w-full max-w-[485px] xl:max-w-[741px] 2xl:max-w-[998px] lg:pr-12 lg:pb-12">
          <div class="pr-12">
            <div class="text-4xl text-white font-semibold leading-relaxed">
              {{ $t('signInTo') }}
            </div>
            <div class="text-2xl text-white leading-relaxed">
              Express Application Front
            </div>
            <div class="min-h-[115px] mt-5 text-sm text-white font-light">
              {{ $t('signInDesc') }}
            </div>
          </div>
          <img
            src="/images/rocket-man.png"
            width="385"
            height="385"
            class="sm:hidden xl:block"
            loading="lazy"
            alt="rocket-man"/>
        </div>
        <div class="md:absolute -bottom-[358px] md:right-[calc(50%-270px)] lg:right-0 max-w-[540px] w-full h-fit bg-white shadow-[0_4px_35px_0_rgba(0,0,0,0.08)] rounded-[40px] p-11">
          <RouterView/>
        </div>
      </div>
    </div>
    <div class="hidden md:block w-full h-1/2"></div>
  </div>
</template>
