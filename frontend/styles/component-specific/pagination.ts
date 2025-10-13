// Library Imports
import { StyleSheet } from "react-native";
// CSS
import { colors } from "../colors"
import { borderRadius } from "../borders";
import { fontSizes } from "../typography";

export const paginationStyles = StyleSheet.create({
    paginationWrapper: {
        paddingTop: 20,
        paddingHorizontal: 20,
        width: "100%",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
    },
    pageSelector: {
        borderRadius: borderRadius.borderRadius,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        fontSize: fontSizes.general,
    },
    pageSelectorArrow: {
        borderRadius: borderRadius.borderRadius,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 2,
        flexDirection: "row",
        alignItems: "center",
        width: 40,
        height: 40,
    },
    pageSelectorActive: {
        backgroundColor: colors.primary500,
        borderColor: colors.primary100,
    },
    pageSelectorActiveText: {
        color: colors.primary100,
    },
    pageSelectorInactiveText: {
        color: colors.neutral900,
    },
    pageSelectorInactive: {
        backgroundColor: colors.primary100,
    }
});
