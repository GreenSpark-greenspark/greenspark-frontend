import axios from "axios";

/**
 * Reissue the authentication token.
 * @param apiUrl - The base URL for the API.
 * @returns {Promise<boolean>} - Returns `true` if the token reissue was successful, otherwise `false`.
 */
export const reissueToken = async (apiUrl: string | undefined): Promise<boolean> => {
  if (!apiUrl) {
    console.error("API URL이 정의되지 않았습니다. 환경변수를 확인하세요.");
    return false;
  }

  try {
    const response = await axios.post(`${apiUrl}/reissue`, {}, { withCredentials: true });

    // response.data 및 success 값 검증
    if (response?.data && typeof response.data.success === "boolean") {
      if (response.data.success) {
        console.log("토큰 갱신 성공");
        return true;
      } else {
        console.error("토큰 갱신 실패:", response.data.message || "Unknown error");
        return false;
      }
    } else {
      console.error("응답 데이터가 예상한 형식이 아닙니다:", response?.data);
      return false;
    }
  } catch (error) {
    console.error("토큰 갱신 중 오류 발생:", error);
    return false;
  }
};
