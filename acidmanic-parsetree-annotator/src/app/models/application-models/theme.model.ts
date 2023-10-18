









export  class ThemeModel {

  public static readonly  darkTheme:ThemeModel = new ThemeModel();
  public static readonly  lightTheme:ThemeModel = {id:'light',displayName:'Light Theme'};

  public id:string='dark';
  public displayName:string='Dark Theme';


}
