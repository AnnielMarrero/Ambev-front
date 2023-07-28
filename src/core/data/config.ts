
// can supply only what needed (the rest will be taken from current locale):
const ptLocale = {
  /* starting with Sunday */
  days: 'Domingo_Segunda_Terça_Quarta_Qunita_Sexta_Sábado'.split('_'),
  daysShort: 'Dom_Seg_Ter_Qua_Qun_Sex_Sáb'.split('_'),
  months:
    'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split(
      '_'
    ),
  monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split(
    '_'
  ),
  firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
  format24h: true,
  pluralDay: 'dias',
};

const centerClassRow = 'q-ml-xl row items-center justify-evenly';

export {ptLocale, centerClassRow}
