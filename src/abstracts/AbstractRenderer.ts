export default abstract class AbstractRenderer {
  /**
   * render 는 다음과 같이 구현합니다.
   * @param data. 렌더링 될 elements 에 쓰일 데이터
   * @return. void. 아무것도 리턴하지 않습니다.
   */
  public abstract render(data: unknown): void;
}
